import express from "express"
import cors from "cors"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const app = express()
app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.json({ system: "META-GENIUSZ OS API" })
})

app.post("/users", async (req, res) => {
  const { username } = req.body

  const user = await prisma.user.create({
    data: { username }
  })

  res.json(user)
})

app.get("/posts", async (req, res) => {
  const posts = await prisma.post.findMany({
    include: { author: true },
    orderBy: { createdAt: "desc" }
  })

  res.json(posts)
})

app.post("/posts", async (req, res) => {
  const { content, authorId } = req.body

  const post = await prisma.post.create({
    data: {
      content,
      authorId
    }
  })

  res.json(post)
})

app.listen(4000, () => {
  console.log("META-GENIUSZ API running on http://localhost:4000")
})