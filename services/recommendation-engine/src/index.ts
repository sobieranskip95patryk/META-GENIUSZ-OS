import express from "express";
import { prisma } from "@meta-geniusz/database";

const PORT = Number(process.env.RECOMMENDATION_SERVICE_PORT) || 3014;
const db = prisma as any;

const app = express();
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "recommendation-engine" });
});

/**
 * GET /feed?userId=:id&vertical=HHU&page=1&pageSize=20
 * Returns a ranked list of posts for a user's feed.
 * Ranking heuristics:
 *   - Posts from followed users: +20 score
 *   - Recency: score decays by time (half-life ~48h)
 *   - Likes count boost: +likesCount * 0.1
 *   - Comments count boost: +commentsCount * 0.2
 */
app.get("/feed", async (req, res) => {
  const userId = req.query.userId as string | undefined;
  const vertical = req.query.vertical as string | undefined;
  const page = Math.max(1, Number(req.query.page ?? 1));
  const pageSize = Math.min(50, Math.max(1, Number(req.query.pageSize ?? 20)));

  try {
    // Get followed user IDs if userId provided
    let followedIds: string[] = [];
    if (userId) {
      const follows = await db.follow.findMany({
        where: { followerId: userId },
        select: { followingId: true },
      });
      followedIds = follows.map((f: { followingId: string }) => f.followingId);
    }

    // Fetch candidate posts (last 7 days, 3x pageSize for re-ranking)
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const candidates = await db.post.findMany({
      where: {
        deletedAt: null,
        status: "PUBLISHED",
        ...(vertical && vertical !== "ALL" ? { vertical } : {}),
        createdAt: { gte: sevenDaysAgo },
      },
      select: {
        id: true,
        content: true,
        imageUrl: true,
        likesCount: true,
        commentsCount: true,
        createdAt: true,
        authorId: true,
        author: { select: { name: true, username: true, image: true } },
      },
      take: pageSize * 3,
      orderBy: { createdAt: "desc" },
    });

    // Score and rank
    const now = Date.now();
    const HALF_LIFE_MS = 48 * 60 * 60 * 1000;

    const scored = candidates.map((post: {
      id: string; authorId: string; likesCount: number; commentsCount: number; createdAt: Date;
      content: string; imageUrl?: string; author: { name?: string; username?: string; image?: string };
    }) => {
      const ageMs = now - new Date(post.createdAt).getTime();
      const recencyScore = Math.pow(0.5, ageMs / HALF_LIFE_MS) * 100;
      const followBonus = followedIds.includes(post.authorId) ? 20 : 0;
      const engagementScore = post.likesCount * 0.1 + post.commentsCount * 0.2;
      const totalScore = recencyScore + followBonus + engagementScore;
      return { ...post, _score: totalScore };
    });

    scored.sort((a: { _score: number }, b: { _score: number }) => b._score - a._score);

    const start = (page - 1) * pageSize;
    const paginated = scored.slice(start, start + pageSize);

    res.json({
      data: { items: paginated, page, pageSize, hasMore: scored.length > start + pageSize },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({ error: message });
  }
});

/**
 * GET /users/suggested?userId=:id
 * Returns users to follow, excluding already followed ones.
 */
app.get("/users/suggested", async (req, res) => {
  const userId = req.query.userId as string | undefined;

  try {
    let excludeIds: string[] = [];
    if (userId) {
      excludeIds.push(userId);
      const follows = await db.follow.findMany({
        where: { followerId: userId },
        select: { followingId: true },
      });
      excludeIds = [...excludeIds, ...follows.map((f: { followingId: string }) => f.followingId)];
    }

    const users = await db.user.findMany({
      where: {
        deletedAt: null,
        status: "ACTIVE",
        id: { notIn: excludeIds.length > 0 ? excludeIds : undefined },
      },
      select: {
        id: true,
        name: true,
        username: true,
        image: true,
        bio: true,
        _count: { select: { followers: true } },
      },
      take: 10,
      orderBy: { createdAt: "desc" },
    });

    res.json({ data: users });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({ error: message });
  }
});

app.listen(PORT, () => {
  console.log(`[recommendation-engine] Running on port ${PORT}`);
});
