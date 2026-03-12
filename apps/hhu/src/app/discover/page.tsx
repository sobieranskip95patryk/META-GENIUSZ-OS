"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

type User = {
  id: string;
  name?: string;
  username?: string;
  image?: string;
  bio?: string;
  _count?: { followers: number };
};

type Post = {
  id: string;
  content: string;
  likesCount: number;
  commentsCount: number;
  createdAt: string;
  author?: { name?: string; username?: string; image?: string };
};

function Avatar({ src, name, size = 40 }: { src?: string; name?: string; size?: number }) {
  const initials = name ? name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase() : "?";
  const s = `${size}px`;
  if (src) {
    return <img src={src} alt={name ?? "avatar"} style={{ width: s, height: s }} className="rounded-full object-cover flex-shrink-0" />;
  }
  return (
    <div style={{ width: s, height: s }} className="rounded-full bg-violet-600 text-white text-sm font-bold flex items-center justify-center flex-shrink-0">
      {initials}
    </div>
  );
}

export default function DiscoverPage() {
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<"users" | "posts">("users");
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const search = useCallback(async (q: string) => {
    if (!q.trim()) return;
    setLoading(true);
    setSearched(true);
    try {
      const res = await fetch(
        `${API_URL}/search?q=${encodeURIComponent(q)}&type=${tab}&vertical=HHU`,
        { credentials: "include" }
      );
      const json = await res.json();
      if (tab === "users") {
        setUsers(json.data?.users ?? json.data ?? []);
      } else {
        setPosts(json.data?.posts ?? json.data ?? []);
      }
    } catch {
      /* ignore */
    } finally {
      setLoading(false);
    }
  }, [tab]);

  useEffect(() => {
    if (query.trim().length >= 2) {
      const id = setTimeout(() => search(query), 400);
      return () => clearTimeout(id);
    } else {
      setUsers([]);
      setPosts([]);
      setSearched(false);
    }
  }, [query, tab, search]);

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/" className="text-gray-500 hover:text-gray-700 transition-colors">
            ← Powrót
          </Link>
          <div className="flex-1 relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Szukaj artystów, postów..."
              className="w-full pl-4 pr-10 py-2 rounded-xl border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
            />
            {loading && (
              <div className="absolute right-3 top-2.5 w-4 h-4 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
            )}
          </div>
        </div>
        <div className="max-w-2xl mx-auto px-4 flex gap-4 border-t border-gray-100">
          {(["users", "posts"] as const).map((t) => (
            <button
              key={t}
              onClick={() => { setTab(t); setUsers([]); setPosts([]); setSearched(false); }}
              className={`py-2.5 text-sm font-medium transition-colors border-b-2 ${
                tab === t
                  ? "border-violet-600 text-violet-700"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {t === "users" ? "Artyści" : "Posty"}
            </button>
          ))}
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-4">
        {!searched && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <span className="text-4xl mb-3">🔍</span>
            <p className="text-gray-500 text-sm">Wpisz co najmniej 2 znaki aby wyszukać</p>
          </div>
        )}

        {/* Users results */}
        {tab === "users" && users.length > 0 && (
          <div className="space-y-3">
            {users.map((user) => (
              <Link
                key={user.id}
                href={`/profile/${user.username}`}
                className="flex items-center gap-3 bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:border-violet-300 transition-colors"
              >
                <Avatar src={user.image} name={user.name ?? user.username} />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-sm">{user.name ?? user.username}</p>
                  {user.username && <p className="text-xs text-gray-400">@{user.username}</p>}
                  {user.bio && <p className="text-xs text-gray-500 mt-0.5 truncate">{user.bio}</p>}
                </div>
                {user._count && (
                  <span className="text-xs text-gray-400 flex-shrink-0">
                    {user._count.followers} obserwujących
                  </span>
                )}
              </Link>
            ))}
          </div>
        )}

        {/* Posts results */}
        {tab === "posts" && posts.length > 0 && (
          <div className="space-y-3">
            {posts.map((post) => (
              <div key={post.id} className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
                {post.author && (
                  <div className="flex items-center gap-2 mb-2">
                    <Avatar src={post.author.image} name={post.author.name ?? post.author.username} size={28} />
                    <span className="text-sm font-medium text-gray-800">
                      {post.author.name ?? post.author.username}
                    </span>
                  </div>
                )}
                <p className="text-sm text-gray-700 leading-relaxed line-clamp-3">{post.content}</p>
                <div className="mt-2 flex items-center gap-3 text-xs text-gray-400">
                  <span>🔥 {post.likesCount}</span>
                  <span>💬 {post.commentsCount}</span>
                  <span className="ml-auto">{new Date(post.createdAt).toLocaleDateString("pl-PL")}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {searched && !loading && tab === "users" && users.length === 0 && (
          <div className="text-center py-12 text-gray-400 text-sm">Brak artystów pasujących do zapytania</div>
        )}
        {searched && !loading && tab === "posts" && posts.length === 0 && (
          <div className="text-center py-12 text-gray-400 text-sm">Brak postów pasujących do zapytania</div>
        )}
      </div>
    </main>
  );
}
