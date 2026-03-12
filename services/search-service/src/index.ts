import express from "express";
import { prisma } from "@meta-geniusz/database";

const PORT = Number(process.env.SEARCH_SERVICE_PORT) || 3012;
const db = prisma as any;

const app = express();
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "search-service" });
});

/**
 * GET /search?q=query&type=users|posts|all&vertical=HHU|RFG|ALL&page=1&pageSize=20
 */
app.get("/search", async (req, res) => {
  const q = String(req.query.q ?? "").trim();
  const type = String(req.query.type ?? "all");
  const vertical = req.query.vertical as string | undefined;
  const page = Math.max(1, Number(req.query.page ?? 1));
  const pageSize = Math.min(50, Math.max(1, Number(req.query.pageSize ?? 20)));
  const skip = (page - 1) * pageSize;

  if (!q || q.length < 2) {
    res.status(400).json({ error: "Query must be at least 2 characters" });
    return;
  }

  try {
    const results: { users?: unknown[]; posts?: unknown[] } = {};

    if (type === "users" || type === "all") {
      results.users = await db.user.findMany({
        where: {
          deletedAt: null,
          status: "ACTIVE",
          OR: [
            { name: { contains: q, mode: "insensitive" } },
            { username: { contains: q, mode: "insensitive" } },
            { bio: { contains: q, mode: "insensitive" } },
          ],
        },
        select: {
          id: true,
          name: true,
          username: true,
          image: true,
          bio: true,
          _count: { select: { followers: true } },
        },
        skip,
        take: pageSize,
        orderBy: { createdAt: "desc" },
      });
    }

    if (type === "posts" || type === "all") {
      results.posts = await db.post.findMany({
        where: {
          deletedAt: null,
          status: "PUBLISHED",
          ...(vertical && vertical !== "ALL" ? { vertical } : {}),
          content: { contains: q, mode: "insensitive" },
        },
        select: {
          id: true,
          content: true,
          likesCount: true,
          commentsCount: true,
          createdAt: true,
          author: { select: { name: true, username: true, image: true } },
        },
        skip,
        take: pageSize,
        orderBy: { likesCount: "desc" },
      });
    }

    res.json({ data: results, query: q, page, pageSize });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({ error: message });
  }
});

app.listen(PORT, () => {
  console.log(`[search-service] Running on port ${PORT}`);
});
