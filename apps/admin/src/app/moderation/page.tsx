"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

type Report = {
  id: string;
  reason: string;
  description?: string;
  status: string;
  createdAt: string;
  reporter?: { name?: string; email?: string };
  post?: { id: string; content?: string };
};

const DECISIONS = ["APPROVE", "REMOVE", "WARN", "SUSPEND", "BAN"];

export default function ModerationPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${API_URL}/admin/reports?status=PENDING&pageSize=50`, { credentials: "include" })
      .then(async (res) => {
        if (res.status === 401 || res.status === 403) { window.location.href = "/auth/login"; return; }
        const json = await res.json();
        setReports(json.data?.items ?? json.data ?? []);
      })
      .finally(() => setLoading(false));
  }, []);

  async function handleAction(reportId: string, action: string) {
    setProcessing(reportId);
    try {
      const res = await fetch(`${API_URL}/admin/reports/${reportId}/action`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ action }),
      });
      if (res.ok) {
        setReports((prev) => prev.filter((r) => r.id !== reportId));
      }
    } finally {
      setProcessing(null);
    }
  }

  const pending = reports.filter((r) => r.status === "PENDING");

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/" className="text-gray-500 hover:text-gray-700 transition-colors">← Dashboard</Link>
          <span className="font-semibold text-gray-900">Moderacja</span>
          {pending.length > 0 && (
            <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-0.5 rounded-full">{pending.length}</span>
          )}
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {loading && <div className="text-center py-12 text-gray-400">Ładowanie...</div>}

        {!loading && reports.length === 0 && (
          <div className="text-center py-16">
            <span className="text-4xl block mb-2">✅</span>
            <p className="text-gray-500">Brak oczekujących zgłoszeń</p>
          </div>
        )}

        <div className="space-y-4">
          {reports.map((report) => (
            <div key={report.id} className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <span className="text-xs bg-orange-100 text-orange-700 font-medium px-2 py-0.5 rounded-full">{report.reason}</span>
                  <p className="text-xs text-gray-400 mt-1">
                    Zgłoszone przez: {report.reporter?.name ?? report.reporter?.email ?? "Anonim"} •{" "}
                    {new Date(report.createdAt).toLocaleDateString("pl-PL")}
                  </p>
                </div>
              </div>

              {report.post?.content && (
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 mb-3">
                  <p className="text-xs text-gray-500 mb-1">Treść posta:</p>
                  <p className="text-sm text-gray-700 line-clamp-3">{report.post.content}</p>
                </div>
              )}

              {report.description && (
                <p className="text-sm text-gray-600 mb-3 italic">&ldquo;{report.description}&rdquo;</p>
              )}

              <div className="flex flex-wrap gap-2">
                {DECISIONS.map((decision) => (
                  <button
                    key={decision}
                    onClick={() => handleAction(report.id, decision)}
                    disabled={processing === report.id}
                    className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50 ${
                      decision === "APPROVE" ? "bg-green-100 text-green-700 hover:bg-green-200" :
                      decision === "REMOVE" ? "bg-red-100 text-red-700 hover:bg-red-200" :
                      decision === "BAN" ? "bg-gray-900 text-white hover:bg-black" :
                      "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {decision}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
