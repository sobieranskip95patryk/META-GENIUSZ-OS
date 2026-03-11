"use client";

import { useEffect, useState } from "react";

type Post = {
  id: string;
  content: string;
  author?: {
    username: string;
  };
};

type User = {
  id: string;
  username: string;
};

export default function HHUFeed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [text, setText] = useState("");
  const [demoUser, setDemoUser] = useState<User | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  async function ensureDemoUser() {
    const res = await fetch("http://localhost:4000/demo-user", {
      method: "POST",
    });

    if (!res.ok) {
      throw new Error("failed to initialize demo user");
    }

    const data = await res.json();
    setDemoUser(data);
    return data as User;
  }

  async function loadPosts() {
    const res = await fetch("http://localhost:4000/posts");

    if (!res.ok) {
      throw new Error("failed to load posts");
    }

    const data = await res.json();
    setPosts(data);
  }

  async function createPost() {
    if (!text.trim()) {
      return;
    }

    try {
      setStatus("Publishing post...");
      const currentUser = demoUser ?? (await ensureDemoUser());

      const res = await fetch("http://localhost:4000/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: text,
          authorId: currentUser.id,
        }),
      });

      if (!res.ok) {
        throw new Error("failed to create post");
      }

      setText("");
      await loadPosts();
      setStatus("Post published.");
    } catch {
      setStatus("Could not publish the post. Check if API is running.");
    }
  }

  useEffect(() => {
    async function bootstrap() {
      try {
        setStatus("Connecting to demo feed...");
        await ensureDemoUser();
        await loadPosts();
        setStatus(null);
      } catch {
        setStatus("Could not connect to API. Start the backend on port 4000.");
      }
    }

    bootstrap();
  }, []);

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-3 text-4xl font-bold">Hip Hop Universe Feed</h1>
        <p className="mb-6 max-w-2xl text-white/65">
          Demo przestrzeni społecznościowej dla twórców, sceny, kultury i
          community storytelling.
        </p>

        {demoUser ? (
          <a
            href={`/profile/${demoUser.username}`}
            className="mb-6 inline-flex rounded-full border border-pink-400/30 bg-pink-400/10 px-4 py-2 text-sm text-pink-200"
          >
            Open demo profile @{demoUser.username}
          </a>
        ) : null}

        {status ? (
          <div className="mb-6 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/70">
            {status}
          </div>
        ) : null}

        <div className="mb-6 flex flex-col gap-3 sm:flex-row">
          <input
            className="w-full rounded bg-neutral-900 p-3 sm:w-96"
            placeholder="Write a post..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <button
            onClick={createPost}
            className="rounded bg-pink-500 px-4 py-3 font-medium text-black"
          >
            Post
          </button>
        </div>

        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="rounded border border-white/10 p-4">
              <div>{post.content}</div>
              {post.author?.username ? (
                <div className="mt-3 text-xs uppercase tracking-[0.2em] text-white/40">
                  @{post.author.username}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
