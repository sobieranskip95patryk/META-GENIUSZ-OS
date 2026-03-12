"use client";

import { useState } from "react";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
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
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Błąd logowania");
      window.location.href = "/";
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Nieznany błąd");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-indigo-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <span className="text-3xl">🤖</span>
          <h1 className="text-2xl font-black text-gray-900 mt-2">AI Studio</h1>
          <p className="text-gray-500 text-sm mt-1">Zaloguj się aby korzystać z narzędzi AI</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-3 text-sm">{error}</div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-gray-50 text-sm focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Hasło</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-gray-50 text-sm focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white font-semibold py-2.5 rounded-xl transition-colors text-sm"
          >
            {loading ? "Logowanie..." : "Zaloguj się"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          Nie masz konta?{" "}
          <Link href="/auth/register" className="text-violet-600 font-medium hover:underline">
            Zarejestruj się
          </Link>
        </p>
      </div>
    </main>
  );
}
