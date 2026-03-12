"use client";

import { useState } from "react";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

const TOOL_CONFIG = {
  bio: { name: "Generator Bio", icon: "✍️", cost: 2, placeholder: "Opisz swój styl muzyczny i doświadczenie...", fieldLabel: "Styl artystyczny", genType: "BIO" },
  caption: { name: "Generator Opisu", icon: "📝", cost: 1, placeholder: "Opisz post (np. nowy singiel, event)...", fieldLabel: "Temat postu", genType: "CAPTION" },
  hashtags: { name: "Sugestie Hashtagów", icon: "#️⃣", cost: 1, placeholder: "Opisz rodzaj contentu...", fieldLabel: "Temat/niszę", genType: "HASHTAGS" },
  promo: { name: "Tekst Promocyjny", icon: "📣", cost: 3, placeholder: "Co chcesz promować?", fieldLabel: "Opis promocji", genType: "PROMO_TEXT" },
  ideas: { name: "Pomysły Contentowe", icon: "💡", cost: 2, placeholder: "Opisz swoją niszę i platformę...", fieldLabel: "Twoja nisza", genType: "CONTENT_IDEAS" },
} as const;

type ToolKey = keyof typeof TOOL_CONFIG;

export default function AIToolPage({ toolId }: { toolId: ToolKey }) {
  const config = TOOL_CONFIG[toolId];
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [credits, setCredits] = useState<number | null>(null);

  async function generate() {
    if (!input.trim()) return;
    setLoading(true);
    setError("");
    setResult("");
    try {
      const res = await fetch(`${API_URL}/ai/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ type: config.genType, prompt: input }),
      });
      if (res.status === 401) {
        window.location.href = "/auth/login";
        return;
      }
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Błąd generowania");
      setResult(json.data?.output ?? json.data ?? "");
      if (json.data?.creditsRemaining !== undefined) {
        setCredits(json.data.creditsRemaining);
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Nieznany błąd");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-indigo-50">
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-gray-200 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/" className="text-gray-500 hover:text-gray-700 transition-colors">← Powrót</Link>
          <span className="text-xl">{config.icon}</span>
          <span className="font-semibold text-gray-900">{config.name}</span>
          {credits !== null && (
            <span className="ml-auto text-xs bg-violet-100 text-violet-700 px-2 py-0.5 rounded-full font-medium">
              ⚡ {credits} kredytów
            </span>
          )}
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-2">{config.fieldLabel}</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={config.placeholder}
            rows={4}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 text-sm text-gray-900 resize-none focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
          />
          <div className="mt-3 flex items-center justify-between">
            <span className="text-xs text-gray-400">⚡ Koszt: {config.cost} kredytów</span>
            <button
              onClick={generate}
              disabled={loading || !input.trim()}
              className="bg-violet-600 hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium px-5 py-2 rounded-xl transition-colors flex items-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Generowanie...
                </>
              ) : (
                "Generuj AI ✨"
              )}
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-4 text-sm mb-5">
            {error}
          </div>
        )}

        {result && (
          <div className="bg-white border border-violet-200 rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-700">Wynik:</h3>
              <button
                onClick={() => navigator.clipboard.writeText(result)}
                className="text-xs text-gray-400 hover:text-violet-600 transition-colors"
              >
                Kopiuj
              </button>
            </div>
            <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">{result}</p>
          </div>
        )}
      </div>
    </main>
  );
}
