"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_URL}/api/auth/sign-in/email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message ?? "Błąd logowania");
      }

      router.push("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Błąd logowania");
    } finally {
      setLoading(false);
    }
  };

  const handleOAuth = (provider: "google" | "github") => {
    window.location.href = `${API_URL}/api/auth/sign-in/social?provider=${provider}&callbackURL=${encodeURIComponent(window.location.origin)}`;
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <span className="text-3xl">🎤</span>
            <span className="text-xl font-bold text-gray-900">Hip Hop Universe</span>
          </Link>
          <p className="text-sm text-gray-500 mt-2">Zaloguj się do swojego konta</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                placeholder="ty@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Hasło</label>
              <input
                id="password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p className="text-xs text-red-500 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-violet-600 text-white text-sm font-semibold rounded-lg hover:bg-violet-700 disabled:opacity-50 transition-colors"
            >
              {loading ? "Logowanie…" : "Zaloguj się"}
            </button>
          </form>

          <div className="mt-4 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs text-gray-400 bg-white px-2">
              lub kontynuuj przez
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <button
              onClick={() => handleOAuth("google")}
              type="button"
              className="flex items-center justify-center gap-2 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <span>🌐</span> Google
            </button>
            <button
              onClick={() => handleOAuth("github")}
              type="button"
              className="flex items-center justify-center gap-2 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <span>🐙</span> GitHub
            </button>
          </div>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Nie masz konta?{" "}
          <Link href="/auth/register" className="text-violet-600 font-medium hover:underline">
            Zarejestruj się
          </Link>
        </p>
      </div>
    </main>
  );
}
