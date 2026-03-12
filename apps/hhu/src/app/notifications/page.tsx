"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

type Notification = {
  id: string;
  type: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  actorId?: string;
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchNotifications();
  }, []);

  async function fetchNotifications() {
    try {
      const res = await fetch(`${API_URL}/notifications`, {
        credentials: "include",
      });
      if (res.status === 401) {
        window.location.href = "/auth/login";
        return;
      }
      if (!res.ok) throw new Error("Błąd pobierania powiadomień");
      const json = await res.json();
      setNotifications(json.data?.items ?? json.data ?? []);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Nieznany błąd");
    } finally {
      setLoading(false);
    }
  }

  async function markRead(id: string) {
    await fetch(`${API_URL}/notifications/${id}/read`, {
      method: "PATCH",
      credentials: "include",
    });
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  }

  async function markAllRead() {
    await fetch(`${API_URL}/notifications/read-all`, {
      method: "POST",
      credentials: "include",
    });
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  }

  function notificationIcon(type: string) {
    const icons: Record<string, string> = {
      LIKE: "🔥",
      COMMENT: "💬",
      FOLLOW: "👤",
      MENTION: "📢",
      SYSTEM: "🔔",
    };
    return icons[type] ?? "🔔";
  }

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-gray-500 hover:text-gray-700 transition-colors">
              ← Powrót
            </Link>
            <span className="font-semibold text-gray-900">Powiadomienia</span>
            {unreadCount > 0 && (
              <span className="bg-violet-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {unreadCount}
              </span>
            )}
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              className="text-sm text-violet-600 hover:text-violet-800 font-medium transition-colors"
            >
              Oznacz wszystkie
            </button>
          )}
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-4">
        {loading && (
          <div className="text-center py-12 text-gray-400">Ładowanie...</div>
        )}
        {error && (
          <div className="bg-red-50 text-red-600 border border-red-200 rounded-xl p-4 text-sm">
            {error}
          </div>
        )}
        {!loading && notifications.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <span className="text-4xl mb-3">🔔</span>
            <p className="text-gray-500">Brak powiadomień</p>
          </div>
        )}
        {!loading && notifications.length > 0 && (
          <div className="space-y-2">
            {notifications.map((notif) => (
              <div
                key={notif.id}
                className={`flex items-start gap-3 p-4 rounded-2xl border transition-colors cursor-pointer ${
                  notif.isRead
                    ? "bg-white border-gray-200"
                    : "bg-violet-50 border-violet-200"
                }`}
                onClick={() => !notif.isRead && markRead(notif.id)}
              >
                <span className="text-xl mt-0.5">{notificationIcon(notif.type)}</span>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm ${notif.isRead ? "text-gray-600" : "text-gray-900 font-medium"}`}>
                    {notif.message}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {new Date(notif.createdAt).toLocaleDateString("pl-PL", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                {!notif.isRead && (
                  <div className="w-2 h-2 rounded-full bg-violet-600 flex-shrink-0 mt-2" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
