"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

type User = {
  id: string;
  name?: string;
  email: string;
  username?: string;
  role: string;
  status: string;
  createdAt: string;
  _count?: { posts: number };
};

const ROLES = ["USER", "MODERATOR", "ADMIN"];
const STATUSES = ["ACTIVE", "SUSPENDED", "BANNED"];

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${API_URL}/admin/users?pageSize=50`, { credentials: "include" })
      .then(async (res) => {
        if (res.status === 401 || res.status === 403) { window.location.href = "/auth/login"; return; }
        const json = await res.json();
        setUsers(json.data?.items ?? json.data ?? []);
      })
      .finally(() => setLoading(false));
  }, []);

  async function updateUser(userId: string, patch: { role?: string; status?: string }) {
    setUpdating(userId);
    try {
      const res = await fetch(`${API_URL}/admin/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(patch),
      });
      if (res.ok) {
        const json = await res.json();
        setUsers((prev) => prev.map((u) => u.id === userId ? { ...u, ...json.data } : u));
      }
    } finally {
      setUpdating(null);
    }
  }

  const filtered = users.filter((u) =>
    !search || u.email.toLowerCase().includes(search.toLowerCase()) ||
    (u.name ?? "").toLowerCase().includes(search.toLowerCase()) ||
    (u.username ?? "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/" className="text-gray-500 hover:text-gray-700 transition-colors">← Dashboard</Link>
          <span className="font-semibold text-gray-900">Użytkownicy</span>
          <span className="ml-auto text-xs text-gray-400">{users.length} total</span>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="mb-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Szukaj po nazwie, e-mail, username..."
            className="w-full max-w-sm px-4 py-2 rounded-xl border border-gray-300 bg-white text-sm focus:outline-none focus:border-violet-500"
          />
        </div>

        {loading && <div className="text-center py-12 text-gray-400">Ładowanie...</div>}

        {!loading && (
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Użytkownik</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">E-mail</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Rola</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Posty</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Data</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((user) => (
                    <tr key={user.id} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div>
                          <p className="font-medium text-gray-900">{user.name ?? "—"}</p>
                          {user.username && <p className="text-xs text-gray-400">@{user.username}</p>}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-600">{user.email}</td>
                      <td className="px-4 py-3">
                        <select
                          value={user.role}
                          disabled={updating === user.id}
                          onChange={(e) => updateUser(user.id, { role: e.target.value })}
                          className="text-xs border border-gray-200 rounded-lg px-2 py-1 bg-white focus:outline-none focus:border-violet-500"
                        >
                          {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <select
                          value={user.status}
                          disabled={updating === user.id}
                          onChange={(e) => updateUser(user.id, { status: e.target.value })}
                          className={`text-xs border rounded-lg px-2 py-1 bg-white focus:outline-none focus:border-violet-500 ${
                            user.status === "ACTIVE" ? "border-green-200 text-green-700" :
                            user.status === "SUSPENDED" ? "border-orange-200 text-orange-700" :
                            "border-red-200 text-red-700"
                          }`}
                        >
                          {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </td>
                      <td className="px-4 py-3 text-gray-500">{user._count?.posts ?? 0}</td>
                      <td className="px-4 py-3 text-xs text-gray-400">{new Date(user.createdAt).toLocaleDateString("pl-PL")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
