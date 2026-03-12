"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";

// ============================================================
// TYPES
// ============================================================

type Author = {
  id: string;
  name?: string;
  username?: string;
  image?: string;
};

type Post = {
  id: string;
  content: string;
  imageUrl?: string;
  author?: Author;
  likesCount: number;
  commentsCount: number;
  isLiked?: boolean;
  createdAt: string;
};

// ============================================================
// CONSTANTS
// ============================================================

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

// ============================================================
// SUB-COMPONENTS
// ============================================================

function Avatar({ src, name, size = 40 }: { src?: string; name?: string; size?: number }) {
  const initials = name ? name.split(" ").map((w: string) => w[0]).join("").slice(0, 2).toUpperCase() : "?";
  const s = `${size}px`;

  if (src) {
    return (
      <img
        src={src}
        alt={name ?? "avatar"}
        style={{ width: s, height: s }}
        className="rounded-full object-cover"
      />
    );
  }

  return (
    <div
      style={{ width: s, height: s }}
      className="rounded-full bg-violet-600 text-white text-sm font-bold flex items-center justify-center shrink-0"
    >
      {initials}
    </div>
  );
}

function TimeAgo({ date }: { date: string }) {
  const secs = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  let label = "przed chwilą";
  if (secs > 60) label = `${Math.floor(secs / 60)}m`;
  if (secs > 3600) label = `${Math.floor(secs / 3600)}h`;
  if (secs > 86400) label = `${Math.floor(secs / 86400)}d`;
  return <span className="text-xs text-gray-400">{label}</span>;
}

function PostCard({
  post,
  onLike,
}: {
  post: Post;
  onLike: (id: string, liked: boolean) => void;
}) {
  const [liked, setLiked] = useState(post.isLiked ?? false);
  const [count, setCount] = useState(post.likesCount);
  const [commenting, setCommenting] = useState(false);
  const [comment, setComment] = useState("");
  const [commentsCount, setCommentsCount] = useState(post.commentsCount);

  const handleLike = async () => {
    const newLiked = !liked;
    setLiked(newLiked);
    setCount((c) => (newLiked ? c + 1 : c - 1));
    onLike(post.id, newLiked);

    try {
      await fetch(`${API_URL}/posts/${post.id}/like`, {
        method: "POST",
        credentials: "include",
      });
    } catch {
      // revert on error
      setLiked(!newLiked);
      setCount((c) => (newLiked ? c - 1 : c + 1));
    }
  };

  const submitComment = async () => {
    if (!comment.trim()) return;
    try {
      const res = await fetch(`${API_URL}/posts/${post.id}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ content: comment }),
      });
      if (res.ok) {
        setCommentsCount((c) => c + 1);
        setComment("");
        setCommenting(false);
      }
    } catch { /* silent */ }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
      {/* Author */}
      <div className="flex items-center gap-3 mb-3">
        <Avatar src={post.author?.image} name={post.author?.name ?? post.author?.username} size={36} />
        <div>
          <div className="flex items-center gap-1.5">
            <Link
              href={`/profile/${post.author?.username}`}
              className="font-semibold text-sm text-gray-900 hover:text-violet-600"
            >
              {post.author?.name ?? post.author?.username ?? "Anonimowy"}
            </Link>
            {post.author?.username && (
              <span className="text-xs text-gray-400">@{post.author.username}</span>
            )}
          </div>
          <TimeAgo date={post.createdAt} />
        </div>
      </div>

      {/* Content */}
      <p className="text-gray-800 text-sm leading-relaxed whitespace-pre-wrap">{post.content}</p>

      {post.imageUrl && (
        <img
          src={post.imageUrl}
          alt=""
          className="mt-3 w-full max-h-72 object-cover rounded-xl"
          loading="lazy"
        />
      )}

      {/* Actions */}
      <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
        <button
          onClick={handleLike}
          className={`flex items-center gap-1.5 transition-colors ${liked ? "text-orange-500" : "hover:text-orange-500"}`}
        >
          <span className="text-base">{liked ? "🔥" : "🩶"}</span>
          <span>{count}</span>
        </button>
        <button
          onClick={() => setCommenting((c) => !c)}
          className="flex items-center gap-1.5 hover:text-violet-600 transition-colors"
        >
          <span className="text-base">💬</span>
          <span>{commentsCount}</span>
        </button>
      </div>

      {/* Inline comment form */}
      {commenting && (
        <div className="mt-3 flex gap-2">
          <input
            className="flex-1 px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
            placeholder="Napisz komentarz…"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submitComment()}
          />
          <button
            onClick={submitComment}
            className="px-3 py-1.5 bg-violet-600 text-white text-sm rounded-lg hover:bg-violet-700"
          >
            Wyślij
          </button>
        </div>
      )}
    </div>
  );
}

// ============================================================
// MAIN PAGE
// ============================================================

export default function HHUFeed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);
  const [status, setStatus] = useState<{ type: "ok" | "err"; msg: string } | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [activeTab, setActiveTab] = useState<"forYou" | "following" | "trending">("forYou");

  const loadPosts = useCallback(async (p = 1) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/posts?vertical=HHU&page=${p}&pageSize=20`);
      const json = await res.json();
      if (json.success) {
        setPosts((prev) => (p === 1 ? json.data.items : [...prev, ...json.data.items]));
        setHasMore(json.data.hasMore);
      }
    } catch {
      setStatus({ type: "err", msg: "Nie można załadować feedu. Sprawdź czy API działa." });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadPosts(1); }, [loadPosts, activeTab]);

  const createPost = async () => {
    if (!text.trim()) return;
    setPosting(true);
    setStatus(null);
    try {
      const res = await fetch(`${API_URL}/posts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ content: text, vertical: "HHU" }),
      });
      if (res.ok) {
        setText("");
        setStatus({ type: "ok", msg: "Post opublikowany ✓" });
        await loadPosts(1);
      } else {
        const json = await res.json();
        if (json.error === 'Unauthorized') {
          setStatus({ type: "err", msg: "Zaloguj się żeby publikować posty." });
        } else {
          setStatus({ type: "err", msg: json.error ?? "Błąd publikacji." });
        }
      }
    } catch {
      setStatus({ type: "err", msg: "Błąd sieci." });
    } finally {
      setPosting(false);
    }
  };

  const handleLike = (_id: string, _liked: boolean) => { /* optimistic already in child */ };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Top nav */}
      <header className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl">🎤</span>
            <span className="font-bold text-gray-900">Hip Hop Universe</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/auth/login"
              className="text-sm text-gray-600 hover:text-violet-600 transition-colors"
            >
              Zaloguj
            </Link>
            <Link
              href="/auth/register"
              className="px-3 py-1.5 bg-violet-600 text-white text-sm rounded-lg hover:bg-violet-700 transition-colors"
            >
              Dołącz
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-5">
        {/* Compose */}
        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
          <textarea
            placeholder="Co słychać na scenie? Podziel się z community… 🎤"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={3}
            className="w-full resize-none text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none"
          />
          <div className="mt-3 flex items-center justify-between">
            <span className={`text-xs ${text.length > 1800 ? "text-red-400" : "text-gray-400"}`}>
              {text.length}/2000
            </span>
            <button
              onClick={createPost}
              disabled={!text.trim() || posting}
              className="px-4 py-1.5 bg-violet-600 text-white text-sm font-semibold rounded-lg hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {posting ? "Publikuję…" : "Publikuj"}
            </button>
          </div>
          {status && (
            <p className={`mt-2 text-xs ${status.type === "ok" ? "text-green-600" : "text-red-500"}`}>
              {status.msg}
            </p>
          )}
        </div>

        {/* TABS */}
        <div className="flex border-b border-gray-200">
          {(["forYou", "following", "trending"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${
                activeTab === tab
                  ? "border-violet-600 text-violet-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab === "forYou" ? "Dla Ciebie" : tab === "following" ? "Obserwowani" : "Trending 🔥"}
            </button>
          ))}
        </div>

        {/* Posts */}
        {loading && posts.length === 0 ? (
          <div className="flex items-center justify-center py-16 text-gray-400">
            <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <span className="text-5xl">🎤</span>
            <p className="mt-3 text-gray-500">Brak postów. Bądź pierwszy!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} onLike={handleLike} />
            ))}
          </div>
        )}

        {hasMore && (
          <button
            onClick={() => { const next = page + 1; setPage(next); loadPosts(next); }}
            className="w-full py-2 text-sm text-gray-500 hover:text-gray-700 border border-gray-200 rounded-xl transition-colors"
          >
            Więcej postów
          </button>
        )}
      </div>
    </main>
  );
}


export default function HHUFeed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [text, setText] = useState("");
  const [demoUser, setDemoUser] = useState<User | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const ensureDemoUser = useCallback(async () => {
    const res = await fetch(`${API_URL}/demo-user`, {
      method: "POST",
    });

    if (!res.ok) {
      throw new Error("failed to initialize demo user");
    }

    const data = await res.json();
    setDemoUser(data);
    return data as User;
  }, [API_URL]);

  const loadPosts = useCallback(async () => {
    const res = await fetch(`${API_URL}/posts`);

    if (!res.ok) {
      throw new Error("failed to load posts");
    }

    const data = await res.json();
    setPosts(data);
  }, [API_URL]);

  async function createPost() {
    if (!text.trim()) {
      return;
    }

    try {
      setStatus("Publishing post...");
      const currentUser = demoUser ?? (await ensureDemoUser());

      const res = await fetch(`${API_URL}/posts`, {
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
  }, [ensureDemoUser, loadPosts]);

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
