"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

export default function UploadPortfolioPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    setLoading(true);
    setError("");

    try {
      // Create portfolio
      const createRes = await fetch(`${API_URL}/portfolios`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ title, description, vertical: "RFG" }),
      });
      if (createRes.status === 401) {
        window.location.href = "/auth/login";
        return;
      }
      if (!createRes.ok) {
        const json = await createRes.json();
        throw new Error(json.error ?? "Błąd tworzenia portfolio");
      }
      const created = await createRes.json();
      const portfolioId: string = created.data?.id ?? created.id;

      // Upload images
      if (files && files.length > 0 && portfolioId) {
        const formData = new FormData();
        Array.from(files).forEach((f) => formData.append("images", f));

        await fetch(`${API_URL}/portfolios/${portfolioId}/images`, {
          method: "POST",
          credentials: "include",
          body: formData,
        });
      }

      router.push(`/portfolio/${portfolioId}`);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Nieznany błąd");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <header className="sticky top-0 z-30 bg-gray-900/90 backdrop-blur border-b border-gray-800 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/" className="text-gray-400 hover:text-white transition-colors">← Galerie</Link>
          <span className="font-semibold text-white">Nowe portfolio</span>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="bg-red-900/30 border border-red-700 text-red-300 rounded-xl p-4 text-sm">{error}</div>
          )}

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Tytuł *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                maxLength={100}
                placeholder="np. Kampania letnia 2025"
                className="w-full px-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:border-rose-500 placeholder-gray-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Opis</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                maxLength={500}
                placeholder="Opisz swoje portfolio..."
                className="w-full px-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white text-sm resize-none focus:outline-none focus:border-rose-500 placeholder-gray-500"
              />
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Zdjęcia</label>
            <div className="border-2 border-dashed border-gray-700 rounded-xl p-6 text-center hover:border-rose-500/50 transition-colors">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => setFiles(e.target.files)}
                className="hidden"
                id="file-input"
              />
              <label htmlFor="file-input" className="cursor-pointer">
                <span className="text-3xl block mb-2">📸</span>
                <p className="text-gray-400 text-sm">Kliknij aby wybrać zdjęcia</p>
                <p className="text-gray-600 text-xs mt-1">JPG, PNG, WEBP do 10MB każde</p>
              </label>
              {files && files.length > 0 && (
                <p className="text-rose-400 text-sm mt-3">Wybrano {files.length} zdjęć</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !title.trim()}
            className="w-full bg-rose-600 hover:bg-rose-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-colors"
          >
            {loading ? "Tworzenie..." : "Utwórz portfolio"}
          </button>
        </form>
      </div>
    </main>
  );
}
