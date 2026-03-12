"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

type AuditEntry = {
  id: string;
  action: string;
  userId?: string;
  details?: unknown;
  createdAt: string;
  user?: { name?: string; email?: string };
};

export default function AuditLogPage() {
  const [logs, setLogs] = useState<AuditEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    loadLogs(1);
  }, []);

  async function loadLogs(p: number) {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/admin/audit-log?page=${p}&pageSize=30`, { credentials: "include" });
      if (res.status === 401 || res.status === 403) { window.location.href = "/auth/login"; return; }
      const json = await res.json();
      const items: AuditEntry[] = json.data?.items ?? json.data ?? [];
      if (p === 1) setLogs(items);
      else setLogs((prev) => [...prev, ...items]);
      setHasMore(items.length === 30);
      setPage(p);
    } finally {
      setLoading(false);
    }
  }

  function actionColor(action: string): string {
    if (action.includes("DELETE") || action.includes("BAN") || action.includes("REMOVE")) return "bg-red-100 text-red-700";
    if (action.includes("CREATE") || action.includes("REGISTER")) return "bg-green-100 text-green-700";
    if (action.includes("UPDATE") || action.includes("EDIT")) return "bg-blue-100 text-blue-700";
    if (action.includes("LOGIN") || action.includes("AUTH")) return "bg-violet-100 text-violet-700";
    return "bg-gray-100 text-gray-600";
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/" className="text-gray-500 hover:text-gray-700 transition-colors">← Dashboard</Link>
          <span className="font-semibold text-gray-900">Logi audytowe</span>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {loading && logs.length === 0 && <div className="text-center py-12 text-gray-400">Ładowanie...</div>}

        {logs.length > 0 && (
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="divide-y divide-gray-100">
              {logs.map((log) => (
                <div key={log.id} className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full whitespace-nowrap flex-shrink-0 mt-0.5 ${actionColor(log.action)}`}>
                    {log.action}
                  </span>
                  <div className="flex-1 min-w-0">
                    {log.user && (
                      <p className="text-xs font-medium text-gray-700">{log.user.name ?? log.user.email}</p>
                    )}
                    {log.details && (
                      <p className="text-xs text-gray-400 truncate mt-0.5">
                        {typeof log.details === "string" ? log.details : JSON.stringify(log.details)}
                      </p>
                    )}
                  </div>
                  <span className="text-xs text-gray-400 flex-shrink-0">
                    {new Date(log.createdAt).toLocaleString("pl-PL", { hour: "2-digit", minute: "2-digit", day: "2-digit", month: "2-digit" })}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {hasMore && (
          <div className="text-center mt-4">
            <button
              onClick={() => loadLogs(page + 1)}
              disabled={loading}
              className="bg-white border border-gray-200 text-gray-600 text-sm font-medium px-5 py-2 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              {loading ? "Ładowanie..." : "Wczytaj więcej"}
            </button>
          </div>
        )}

        {!loading && logs.length === 0 && (
          <div className="text-center py-12 text-gray-400">Brak wpisów w logu</div>
        )}
      </div>
    </main>
  );
}
