"use client";

import { useEffect, useState } from "react";

type Post = {
  id: string;
  content: string;
};

export default function HHUFeed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [text, setText] = useState("");

  async function loadPosts() {
    const res = await fetch("http://localhost:4000/posts");
    const data = await res.json();
    setPosts(data);
  }

  async function createPost() {
    if (!text.trim()) return;

    await fetch("http://localhost:4000/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: text,
        authorId: "demo",
      }),
    });

    setText("");
    loadPosts();
  }

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold mb-6">
        Hip Hop Universe Feed
      </h1>

      <div className="flex gap-3 mb-6">
        <input
          className="bg-neutral-900 p-2 rounded w-96"
          placeholder="Write a post..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button
          onClick={createPost}
          className="bg-pink-500 px-4 rounded"
        >
          Post
        </button>
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="border border-white/10 p-4 rounded">
            {post.content}
          </div>
        ))}
      </div>
    </main>
  );
}