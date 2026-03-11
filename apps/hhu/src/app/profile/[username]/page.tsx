type Post = {
  id: string;
  content: string;
  createdAt: string;
};

type UserProfile = {
  id: string;
  username: string;
  bio?: string | null;
  posts: Post[];
};

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

async function getProfile(username: string): Promise<UserProfile | null> {
  const res = await fetch(`${API_URL}/users/${username}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return null;
  }

  return res.json();
}

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const profile = await getProfile(username);

  if (!profile) {
    return (
      <main className="min-h-screen bg-black p-10 text-white">
        <div className="mx-auto max-w-3xl">
          <a href="/" className="text-cyan-300">
            ← Back
          </a>
          <h1 className="mt-6 text-4xl font-black">Profile not found</h1>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black p-10 text-white">
      <div className="mx-auto max-w-3xl">
        <a href="/" className="text-cyan-300">
          ← Back to HHU
        </a>

        <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.04] p-6">
          <div className="text-sm uppercase tracking-[0.25em] text-pink-400">
            Hip Hop Universe Profile
          </div>

          <h1 className="mt-3 text-4xl font-black">@{profile.username}</h1>

          <p className="mt-3 text-white/70">
            {profile.bio || "No bio yet."}
          </p>
        </div>

        <div className="mt-8">
          <h2 className="mb-4 text-2xl font-bold">Posts</h2>

          <div className="space-y-4">
            {profile.posts.length === 0 ? (
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 text-white/50">
                No posts yet.
              </div>
            ) : (
              profile.posts.map((post) => (
                <div
                  key={post.id}
                  className="rounded-3xl border border-white/10 bg-white/[0.04] p-5"
                >
                  <div className="text-white">{post.content}</div>
                  <div className="mt-4 text-xs text-white/40">
                    {new Date(post.createdAt).toLocaleString()}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </main>
  );
}