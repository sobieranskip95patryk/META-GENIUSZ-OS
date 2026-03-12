"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

type Credits = { balance: number };

const AI_TOOLS = [
  { id: "bio", name: "Generator Bio", description: "AI stworzy profesjonalne bio do Twojego profilu artystycznego.", icon: "✍️", cost: 2, href: "/tools/bio" },
  { id: "caption", name: "Generator Opisu", description: "Opisy do postów, które angażują fanów.", icon: "📝", cost: 1, href: "/tools/caption" },
  { id: "hashtags", name: "Sugestie Hashtagów", description: "Optymalne hashtagi dla maksymalnego zasięgu.", icon: "#️⃣", cost: 1, href: "/tools/hashtags" },
  { id: "promo", name: "Tekst Promocyjny", description: "Przekonujące posty promocyjne do mediów społecznościowych.", icon: "📣", cost: 3, href: "/tools/promo" },
  { id: "ideas", name: "Pomysły Contentowe", description: "Inspiracje i pomysły dla twórców muzycznych.", icon: "💡", cost: 2, href: "/tools/ideas" },
];

export default function Home() {
  const [credits, setCredits] = useState<Credits | null>(null);
  const [user, setUser] = useState<{ name?: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [sessionRes, creditsRes] = await Promise.all([
          fetch(`${API_URL}/api/auth/get-session`, { credentials: "include" }),
          fetch(`${API_URL}/ai/credits`, { credentials: "include" }),
        ]);
        if (sessionRes.ok) {
          const s = await sessionRes.json();
          setUser(s.user ?? null);
        }
        if (creditsRes.ok) {
          const c = await creditsRes.json();
          setCredits(c.data ?? c);
        }
      } catch {
        /* ignore */
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-indigo-50">
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🤖</span>
            <span className="font-bold text-gray-900">AI Studio</span>
            <span className="text-xs text-gray-400 font-medium">— META-GENIUSZ</span>
          </div>
          <div className="flex items-center gap-3">
            {credits !== null && (
              <div className="flex items-center gap-1.5 bg-violet-100 text-violet-700 text-sm font-medium px-3 py-1 rounded-full">
                ⚡ {credits.balance} kredytów
              </div>
            )}
            {user ? (
              <span className="text-sm text-gray-600">{user.name}</span>
            ) : !loading ? (
              <Link href="/auth/login" className="text-sm text-violet-600 font-medium hover:underline">
                Zaloguj się
              </Link>
            ) : null}
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black text-gray-900 mb-3">
            Twórz z mocą <span className="text-violet-600">AI</span>
          </h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Narzędzia oparte na Google Gemini dla artystów i twórców muzycznych.
          </p>
        </div>

        {!loading && !user && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-center mb-8">
            <p className="text-amber-700 text-sm">
              <Link href="/auth/login" className="font-semibold underline">Zaloguj się</Link> aby korzystać z narzędzi AI.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {AI_TOOLS.map((tool) => (
            <Link
              key={tool.id}
              href={tool.href}
              className="group bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-violet-300 transition-all"
            >
              <div className="text-3xl mb-3">{tool.icon}</div>
              <h2 className="font-bold text-gray-900 mb-1 group-hover:text-violet-700 transition-colors">{tool.name}</h2>
              <p className="text-sm text-gray-500 leading-relaxed mb-4">{tool.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs bg-violet-100 text-violet-700 font-medium px-2 py-0.5 rounded-full">⚡ {tool.cost} kredytów</span>
                <span className="text-xs text-gray-400 group-hover:text-violet-600 transition-colors">Wypróbuj →</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 bg-white border border-gray-200 rounded-2xl p-6 text-center">
          <p className="text-gray-500 text-sm mb-1">Nowe konto = <strong className="text-gray-800">10 darmowych kredytów</strong></p>
          <p className="text-gray-400 text-xs">Kredyty są pobierane przy każdym użyciu narzędzi AI.</p>
        </div>
      </div>
    </main>
  );
}


