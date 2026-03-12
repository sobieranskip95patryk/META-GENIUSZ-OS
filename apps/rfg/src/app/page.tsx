"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

type Portfolio = {
  id: string;
  title: string;
  description?: string;
  coverImageUrl?: string;
  author?: { name?: string; username?: string; image?: string };
  _count?: { images: number };
  createdAt: string;
};

function Avatar({ src, name, size = 32 }: { src?: string; name?: string; size?: number }) {
  const initials = name ? name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase() : "?";
  const s = `${size}px`;
  if (src) return <img src={src} alt={name ?? "avatar"} style={{ width: s, height: s }} className="rounded-full object-cover" />;
  return <div style={{ width: s, height: s }} className="rounded-full bg-rose-500 text-white text-xs font-bold flex items-center justify-center">{initials}</div>;
}

export default function Home() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [ageVerified, setAgeVerified] = useState<boolean | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("rfg_age_ok");
    setAgeVerified(stored === "yes");
  }, []);

  useEffect(() => {
    if (ageVerified) fetchPortfolios();
  }, [ageVerified]);

  async function fetchPortfolios() {
    try {
      const res = await fetch(`${API_URL}/portfolios?vertical=RFG&pageSize=20`);
      if (!res.ok) return;
      const json = await res.json();
      setPortfolios(json.data?.items ?? json.data ?? []);
    } catch {
      /* ignore */
    } finally {
      setLoading(false);
    }
  }

  function confirmAge() {
    sessionStorage.setItem("rfg_age_ok", "yes");
    setAgeVerified(true);
    setLoading(true);
  }

  // Age gate
  if (ageVerified === null) return null;
  if (!ageVerified) {
    return (
      <main className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
        <div className="max-w-sm w-full text-center">
          <div className="text-5xl mb-5">🔞</div>
          <h1 className="text-2xl font-black text-white mb-2">Weryfikacja wieku</h1>
          <p className="text-gray-400 text-sm mb-6">Ta platforma zawiera treści wyłącznie dla osób pełnoletnich (18+). Czy masz ukończone 18 lat?</p>
          <div className="flex gap-3">
            <button
              onClick={confirmAge}
              className="flex-1 bg-rose-600 hover:bg-rose-700 text-white font-semibold py-3 rounded-xl transition-colors"
            >
              Mam 18+ lat
            </button>
            <button
              onClick={() => window.location.href = "/"}
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 rounded-xl transition-colors"
            >
              Wyjdź
            </button>
          </div>
          <p className="text-xs text-gray-600 mt-4">Klikając "Mam 18+ lat" potwierdzasz, że masz ukończone 18 lat i akceptujesz regulamin.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-gray-900/90 backdrop-blur border-b border-gray-800 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🚀</span>
            <span className="font-bold text-white">Rocket Fuell Girls</span>
            <span className="text-xs text-gray-500 font-medium hidden sm:block">— Visual Premium</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/portfolio/upload" className="bg-rose-600 hover:bg-rose-700 text-white text-sm font-medium px-4 py-1.5 rounded-xl transition-colors">
              + Dodaj
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-white mb-2">Galerie</h1>
          <p className="text-gray-400 text-sm">Portfolia artystyczne dla modelek, muses i kreatorek premium.</p>
        </div>

        {loading && (
          <div className="text-center py-16 text-gray-400">Ładowanie galerii...</div>
        )}

        {!loading && portfolios.length === 0 && (
          <div className="text-center py-16">
            <span className="text-4xl mb-3 block">📸</span>
            <p className="text-gray-400">Brak portfolio</p>
            <Link href="/portfolio/upload" className="inline-block mt-4 bg-rose-600 text-white text-sm font-medium px-5 py-2 rounded-xl hover:bg-rose-700 transition-colors">
              Dodaj pierwsze portfolio
            </Link>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {portfolios.map((p) => (
            <Link key={p.id} href={`/portfolio/${p.id}`} className="group relative bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden hover:border-rose-500/50 transition-all">
              {p.coverImageUrl ? (
                <img src={p.coverImageUrl} alt={p.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
              ) : (
                <div className="w-full h-48 bg-gradient-to-br from-rose-900/40 to-gray-900 flex items-center justify-center">
                  <span className="text-4xl text-rose-400/60">📸</span>
                </div>
              )}
              <div className="p-4">
                <h2 className="font-bold text-white mb-1 group-hover:text-rose-400 transition-colors">{p.title}</h2>
                {p.description && <p className="text-xs text-gray-400 line-clamp-2 mb-3">{p.description}</p>}
                <div className="flex items-center gap-2">
                  {p.author && <Avatar src={p.author.image} name={p.author.name ?? p.author.username} size={24} />}
                  <span className="text-xs text-gray-400">{p.author?.name ?? p.author?.username}</span>
                  {p._count && <span className="ml-auto text-xs text-gray-500">{p._count.images} zdjęć</span>}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

      <div className="mx-auto max-w-5xl">
        <a href="http://localhost:3000" className="text-sm text-cyan-300">
          ← Back to META-GENIUSZ OS

