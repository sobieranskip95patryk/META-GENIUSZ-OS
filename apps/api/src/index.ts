import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import rateLimit from "express-rate-limit";
import { Request, Response, NextFunction } from 'express';

const prisma = new PrismaClient();
const app = express();

const PORT = process.env.PORT || 3000;

const authenticate: (req: Request & { user?: any }, res: Response, next: NextFunction) => void = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = user;
    next();
  } catch (err) {
    res.status(403).json({ error: "Forbidden" });
  }
};

async function getOrCreateDemoUser() {
  const existing = await prisma.user.findUnique({
    where: { username: "demo_hhu" },
  });

  if (existing) {
    return existing;
  }

  return prisma.user.create({
    data: {
      username: "demo_hhu",
      bio: "Demo Hip Hop Universe creator",
    },
  });
}

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});

app.use(cors());
app.use(express.json());
app.use(limiter);

app.get("/", (_req, res) => {
  res.json({ system: "META-GENIUSZ OS API", status: "running" });
});

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

/* USERS */

app.post("/users", async (req, res) => {
  try {
    const { username, bio } = req.body;

    if (!username || typeof username !== "string") {
      return res.status(400).json({ error: "username is required" });
    }

    const user = await prisma.user.create({
      data: {
        username,
        bio: typeof bio === "string" ? bio : null,
      },
    });

    return res.json(user);
  } catch (error: any) {
    return res.status(500).json({
      error: "failed to create user",
      details: error.message,
    });
  }
});

app.get("/users", async (_req, res) => {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: "asc" },
    });

    return res.json(users);
  } catch (error: any) {
    return res.status(500).json({
      error: "failed to fetch users",
      details: error.message,
    });
  }
});

app.get("/users/:username", async (req, res) => {
  try {
    const { username } = req.params;

    const user = await prisma.user.findUnique({
      where: { username },
      include: {
        posts: {
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }

    return res.json(user);
  } catch (error: any) {
    return res.status(500).json({
      error: "failed to fetch user profile",
      details: error.message,
    });
  }
});

/* DEMO USER */

app.post("/demo-user", async (_req, res) => {
  try {
    const user = await getOrCreateDemoUser();

    return res.json(user);
  } catch (error: any) {
    return res.status(500).json({
      error: "failed to create demo user",
      details: error.message,
    });
  }
});

/* POSTS */

app.post("/posts", async (req, res) => {
  try {
    const { content, authorId } = req.body;

    if (!content || typeof content !== "string") {
      return res.status(400).json({ error: "content is required" });
    }

    if (!authorId || typeof authorId !== "string") {
      return res.status(400).json({ error: "authorId is required" });
    }

    const post = await prisma.post.create({
      data: {
        content,
        authorId,
      },
      include: {
        author: true,
      },
    });

    return res.json(post);
  } catch (error: any) {
    return res.status(500).json({
      error: "failed to create post",
      details: error.message,
    });
  }
});

app.get("/posts", async (_req, res) => {
  try {
    const posts = await prisma.post.findMany({
      include: { author: true },
      orderBy: { createdAt: "desc" },
    });

    return res.json(posts);
  } catch (error: any) {
    return res.status(500).json({
      error: "failed to fetch posts",
      details: error.message,
    });
  }
});

app.get("/seed-demo-user", async (_req, res) => {
  try {
    const user = await getOrCreateDemoUser();

    return res.json(user);
  } catch (error: any) {
    return res.status(500).json({
      error: "failed to seed demo user",
      details: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
