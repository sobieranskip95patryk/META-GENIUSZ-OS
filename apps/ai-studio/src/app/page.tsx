export default function Home() {
  const tools = [
    {
      title: "Bio Generator",
      desc: "Generuj profesjonalne bio dla twórców na podstawie ich profilu i stylu.",
      badge: "AI",
    },
    {
      title: "Caption Wizard",
      desc: "AI captions do postów, Reels i kampanii dopasowane do niszy.",
      badge: "AI",
    },
    {
      title: "Growth Strategy",
      desc: "Spersonalizowana strategia wzrostu zasięgów i zaangażowania.",
      badge: "AI",
    },
    {
      title: "Content Concepts",
      desc: "Generowanie koncepcji kreatywnych i briefów contentowych.",
      badge: "AI",
    },
    {
      title: "Trend Analysis",
      desc: "Analiza trendów w niszy twórcy na wybranych platformach.",
      badge: "AI",
    },
    {
      title: "LOGOS Core",
      desc: "Warstwa orkiestracji AI — routing promptów i inteligencja systemowa.",
      badge: "Core",
    },
  ];

  return (
    <main className="min-h-screen bg-black px-6 py-16 text-white">
      <div className="mx-auto max-w-5xl">
        <a href="http://localhost:3000" className="text-sm text-cyan-300">
          ← Back to META-GENIUSZ OS
        </a>

        <div className="mt-6 inline-flex items-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm tracking-[0.2em] text-white/70 uppercase backdrop-blur">
          AI + Growth
        </div>

        <h1 className="mt-6 text-5xl font-black">AI Studio</h1>

        <p className="mt-4 max-w-2xl text-white/70 text-lg leading-7">
          Narzędzia AI do generowania bio, captionów, koncepcji i strategii wzrostu dla twórców.
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {tools.map((tool) => (
            <div
              key={tool.title}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur transition hover:border-cyan-400/30 hover:bg-white/[0.07]"
            >
              <div className="inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-cyan-300">
                {tool.badge}
              </div>
              <h2 className="mt-4 text-lg font-bold">{tool.title}</h2>
              <p className="mt-2 text-sm leading-6 text-white/60">{tool.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-3xl border border-cyan-500/20 bg-cyan-500/5 p-6">
          <div className="text-sm uppercase tracking-[0.2em] text-cyan-400">Status</div>
          <p className="mt-2 text-white/70">
            Moduł w budowie — implementacja w fazie v0.4.0. Integracja z LOGOS AI Core.
          </p>
        </div>
      </div>
    </main>
  );
}
