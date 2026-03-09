import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

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

/* DEMO USER */

app.post("/demo-user", async (_req, res) => {
  try {
    const existing = await prisma.user.findUnique({
      where: { username: "demo_hhu" },
    });

    if (existing) {
      return res.json(existing);
    }

    const user = await prisma.user.create({
      data: {
        username: "demo_hhu",
        bio: "Demo Hip Hop Universe creator",
      },
    });

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

app.listen(4000, () => {
  console.log("META-GENIUSZ API running on http://localhost:4000");
});