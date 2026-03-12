import Link from "next/link";
import { notFound } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

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
  likesCount: number;
  commentsCount: number;
  createdAt: string;
  author?: Author;
};

type UserProfile = {
  id: string;
  name?: string;
  username?: string;
  bio?: string;
  image?: string;
  role: string;
  createdAt: string;
  _count?: { followers: number; following: number; posts: number };
};

async function getProfile(username: string): Promise<UserProfile | null> {
  try {
    const res = await fetch(`${API_URL}/users/${username}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data ?? json;
  } catch {
    return null;
  }
}

async function getUserPosts(username: string): Promise<Post[]> {
  try {
    const res = await fetch(`${API_URL}/posts?authorUsername=${username}&pageSize=20`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data?.items ?? json.data ?? [];
  } catch {
    return [];
  }
}

function Avatar({ src, name, size = 80 }: { src?: string; name?: string; size?: number }) {
  const initials = name ? name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase() : "?";
  const s = `${size}px`;
  if (src) {
    return <img src={src} alt={name ?? "avatar"} style={{ width: s, height: s }} className="rounded-full object-cover" />;
  }
  return (
    <div
      style={{ width: s, height: s }}
      className="rounded-full bg-violet-600 text-white text-2xl font-bold flex items-center justify-center"
    >
      {initials}
    </div>
  );
}

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const [profile, posts] = await Promise.all([getProfile(username), getUserPosts(username)]);

  if (!profile) return notFound();

  const displayName = profile.name ?? profile.username ?? "Użytkownik";
  const stats = profile._count ?? { followers: 0, following: 0, posts: 0 };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/" className="text-gray-500 hover:text-gray-700 transition-colors">
            ← Powrót
          </Link>
          <span className="font-semibold text-gray-900">@{username}</span>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Profile card */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm mb-6">
          <div className="flex items-start gap-5">
            <Avatar src={profile.image} name={displayName} size={80} />
            <div className="flex-1 min-w-0">
              <h1 className="text-xl font-bold text-gray-900">{displayName}</h1>
              {profile.username && (
                <p className="text-sm text-gray-400">@{profile.username}</p>
              )}
              {profile.bio && (
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">{profile.bio}</p>
              )}
              <div className="mt-3 flex items-center gap-4 text-sm">
                <span className="text-gray-700">
                  <b className="text-gray-900">{stats.posts}</b>{" "}
                  <span className="text-gray-500">postów</span>
                </span>
                <span className="text-gray-700">
                  <b className="text-gray-900">{stats.followers}</b>{" "}
                  <span className="text-gray-500">obserwujących</span>
                </span>
                <span className="text-gray-700">
                  <b className="text-gray-900">{stats.following}</b>{" "}
                  <span className="text-gray-500">obserwuje</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Posts */}
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Posty</h2>

        {posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <span className="text-4xl mb-3">📭</span>
            <p className="text-gray-500">Brak postów</p>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <div key={post.id} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                <p className="text-gray-800 text-sm leading-relaxed whitespace-pre-wrap">{post.content}</p>
                {post.imageUrl && (
                  <img src={post.imageUrl} alt="" className="mt-3 w-full max-h-72 object-cover rounded-xl" />
                )}
                <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">🔥 {post.likesCount}</span>
                  <span className="flex items-center gap-1">💬 {post.commentsCount}</span>
                  <span className="ml-auto text-xs text-gray-400">
                    {new Date(post.createdAt).toLocaleDateString("pl-PL")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

