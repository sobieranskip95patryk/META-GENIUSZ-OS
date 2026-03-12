import Link from "next/link";
import { notFound } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

type PortfolioImage = { id: string; url: string; caption?: string };
type Portfolio = {
  id: string;
  title: string;
  description?: string;
  coverImageUrl?: string;
  images: PortfolioImage[];
  author?: { name?: string; username?: string; image?: string };
  createdAt: string;
};

async function getPortfolio(id: string): Promise<Portfolio | null> {
  try {
    const res = await fetch(`${API_URL}/portfolios/${id}`, { cache: "no-store" });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data ?? json;
  } catch {
    return null;
  }
}

export default async function PortfolioDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const portfolio = await getPortfolio(id);
  if (!portfolio) return notFound();

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <header className="sticky top-0 z-30 bg-gray-900/90 backdrop-blur border-b border-gray-800 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/" className="text-gray-400 hover:text-white transition-colors">← Galerie</Link>
          <span className="text-gray-600">/</span>
          <span className="font-semibold text-white truncate">{portfolio.title}</span>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Cover */}
        {portfolio.coverImageUrl && (
          <div className="relative w-full h-64 sm:h-96 rounded-2xl overflow-hidden mb-8">
            <img src={portfolio.coverImageUrl} alt={portfolio.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
        )}

        {/* Info */}
        <div className="mb-8">
          <h1 className="text-3xl font-black text-white mb-2">{portfolio.title}</h1>
          {portfolio.description && <p className="text-gray-400 leading-relaxed">{portfolio.description}</p>}
          {portfolio.author && (
            <div className="flex items-center gap-2 mt-3">
              {portfolio.author.image && (
                <img src={portfolio.author.image} alt="" className="w-7 h-7 rounded-full object-cover" />
              )}
              <span className="text-sm text-gray-400">{portfolio.author.name ?? portfolio.author.username}</span>
              <span className="text-gray-600 text-xs ml-2">
                {new Date(portfolio.createdAt).toLocaleDateString("pl-PL")}
              </span>
            </div>
          )}
        </div>

        {/* Images grid */}
        {portfolio.images.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <span className="text-3xl block mb-2">📸</span>
            Brak zdjęć w tym portfolio
          </div>
        ) : (
          <div className="columns-2 sm:columns-3 gap-3 space-y-3">
            {portfolio.images.map((img) => (
              <div key={img.id} className="break-inside-avoid rounded-xl overflow-hidden">
                <img src={img.url} alt={img.caption ?? ""} className="w-full object-cover hover:opacity-90 transition-opacity" />
                {img.caption && <p className="text-xs text-gray-500 p-2">{img.caption}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
