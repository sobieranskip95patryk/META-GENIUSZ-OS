"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

function PasswordStrength({ password }: { password: string }) {
  const checks = [
    { label: "8+ znaków", ok: password.length >= 8 },
    { label: "Duża litera", ok: /[A-Z]/.test(password) },
    { label: "Mała litera", ok: /[a-z]/.test(password) },
    { label: "Cyfra", ok: /\d/.test(password) },
  ];
  const score = checks.filter((c) => c.ok).length;
  const colors = ["bg-red-400", "bg-orange-400", "bg-yellow-400", "bg-green-400", "bg-green-500"];

  return (
    <div className="mt-1 space-y-1">
      <div className="flex gap-1">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className={`h-1 flex-1 rounded ${i < score ? colors[score] : "bg-gray-200"}`} />
        ))}
      </div>
      <div className="flex flex-wrap gap-1.5">
        {checks.map((c) => (
          <span key={c.label} className={`text-[10px] ${c.ok ? "text-green-600" : "text-gray-400"}`}>
            {c.ok ? "✓" : "○"} {c.label}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState<"form" | "success">("form");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password.length < 8) {
      setError("Hasło musi mieć minimum 8 znaków");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/auth/sign-up/email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message ?? "Błąd rejestracji");
      }

      setStep("success");
      setTimeout(() => router.push("/"), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Błąd rejestracji");
    } finally {
      setLoading(false);
    }
  };

  const handleOAuth = (provider: "google" | "github") => {
    window.location.href = `${API_URL}/api/auth/sign-in/social?provider=${provider}&callbackURL=${encodeURIComponent(window.location.origin)}`;
  };

  if (step === "success") {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <span className="text-5xl block mb-3">✅</span>
          <p className="text-lg font-semibold text-gray-800">Konto utworzone!</p>
          <p className="text-sm text-gray-500 mt-1">Przekierowanie…</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <span className="text-3xl">🎤</span>
            <span className="text-xl font-bold text-gray-900">Hip Hop Universe</span>
          </Link>
          <p className="text-sm text-gray-500 mt-2">Dołącz do community</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Imię / Nick artystyczny</label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                placeholder="MC Przykładowy"
              />
            </div>

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
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                placeholder="••••••••"
              />
              {password && <PasswordStrength password={password} />}
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
              {loading ? "Rejestruję…" : "Zarejestruj się"}
            </button>
          </form>

          <p className="text-center text-xs text-gray-400 mt-3">
            Rejestrując się, akceptujesz{" "}
            <Link href="/terms" className="text-violet-500 hover:underline">Warunki korzystania</Link>
            {" "}i{" "}
            <Link href="/privacy" className="text-violet-500 hover:underline">Politykę prywatności</Link>.
          </p>

          <div className="mt-4 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs text-gray-400 bg-white px-2">
              lub zarejestruj się przez
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
          Masz konto?{" "}
          <Link href="/auth/login" className="text-violet-600 font-medium hover:underline">
            Zaloguj się
          </Link>
        </p>
      </div>
    </main>
  );
}
