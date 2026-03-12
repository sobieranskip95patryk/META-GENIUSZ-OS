"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

type GlobalStats = {
  totalUsers: number;
  activeUsers: number;
  totalPosts: number;
  totalReports: number;
  pendingReports: number;
};

function StatCard({ label, value, color }: { label: string; value: number | string; color: string }) {
  return (
    <div className={`bg-white border rounded-2xl p-5 shadow-sm ${color}`}>
      <p className="text-sm text-gray-500 mb-1">{label}</p>
      <p className="text-3xl font-black text-gray-900">{value}</p>
    </div>
  );
}

export default function Home() {
  const [stats, setStats] = useState<GlobalStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/admin/stats`, { credentials: "include" })
      .then(async (res) => {
        if (res.status === 401 || res.status === 403) {
          window.location.href = "/auth/login";
          return;
        }
        const json = await res.json();
        setStats(json.data ?? json);
      })
      .catch(() => setError("Błąd pobierania statystyk"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">⚙️</span>
            <span className="font-bold text-gray-900">Admin Panel</span>
            <span className="text-xs text-gray-400 ml-1">META-GENIUSZ OS</span>
          </div>
          <nav className="flex items-center gap-4 text-sm">
            <Link href="/users" className="text-gray-500 hover:text-gray-900 transition-colors">Użytkownicy</Link>
            <Link href="/moderation" className="text-gray-500 hover:text-gray-900 transition-colors">Moderacja</Link>
            <Link href="/audit" className="text-gray-500 hover:text-gray-900 transition-colors">Logi</Link>
          </nav>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-black text-gray-900 mb-6">Dashboard</h1>

        {loading && <div className="text-center py-12 text-gray-400">Ładowanie...</div>}
        {error && <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-4 text-sm mb-6">{error}</div>}

        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
            <StatCard label="Użytkownicy" value={stats.totalUsers} color="border-blue-200" />
            <StatCard label="Aktywni" value={stats.activeUsers} color="border-green-200" />
            <StatCard label="Posty" value={stats.totalPosts} color="border-violet-200" />
            <StatCard label="Zgłoszenia" value={stats.totalReports} color="border-orange-200" />
            <StatCard label="Oczekujące" value={stats.pendingReports} color="border-red-200" />
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { title: "Zarządzanie użytkownikami", desc: "Przeglądaj konta, role, statusy i weryfikacje.", href: "/users", icon: "👥", color: "hover:border-blue-300" },
            { title: "Kolejka moderacji", desc: "Zgłoszenia treści oczekujące na decyzję.", href: "/moderation", icon: "🛡️", color: "hover:border-orange-300", badge: stats?.pendingReports },
            { title: "Logi audytowe", desc: "Historia działań i zdarzeń systemowych.", href: "/audit", icon: "📋", color: "hover:border-violet-300" },
            { title: "Ustawienia systemu", desc: "Feature flags, konfiguracja, backup.", href: "/settings", icon: "⚙️", color: "hover:border-gray-300" },
          ].map((item) => (
            <Link key={item.href} href={item.href}
              className={`bg-white border border-gray-200 rounded-2xl p-5 shadow-sm transition-all ${item.color} hover:shadow-md`}>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{item.icon}</span>
                <h2 className="font-bold text-gray-900">{item.title}</h2>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="ml-auto bg-red-100 text-red-600 text-xs font-bold px-2 py-0.5 rounded-full">{item.badge}</span>
                )}
              </div>
              <p className="text-sm text-gray-500">{item.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

