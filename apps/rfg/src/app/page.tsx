export default function Home() {
  return (
    <main className="min-h-screen bg-black px-6 py-16 text-white">
      <div className="mx-auto max-w-5xl">
        <a href="http://localhost:3000" className="text-sm text-cyan-300">
          ← Back to META-GENIUSZ OS
        </a>

        <div className="mt-6 inline-flex items-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm tracking-[0.2em] text-white/70 uppercase backdrop-blur">
          Visual + Premium
        </div>

        <h1 className="mt-6 text-5xl font-black">Rocket Fuell Girls</h1>

        <p className="mt-4 max-w-2xl text-white/70 text-lg leading-7">
          Visual talent vertical dla modelek, muses, galerii i kampanii premium.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {[
            {
              title: "Galerie",
              desc: "Portfolia i projekty wizualne topowych talentów.",
              badge: "Photos",
            },
            {
              title: "Odkrywanie",
              desc: "Znajdź modelki, artystki i kreatorki dopasowane do Twojej kampanii.",
              badge: "Discovery",
            },
            {
              title: "Kampanie",
              desc: "Brief system i zarządzanie kampaniami premium.",
              badge: "Premium",
            },
          ].map((card) => (
            <div
              key={card.title}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur"
            >
              <div className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.2em] text-white/60">
                {card.badge}
              </div>
              <h2 className="mt-4 text-xl font-bold">{card.title}</h2>
              <p className="mt-2 text-sm leading-6 text-white/60">{card.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-3xl border border-fuchsia-500/20 bg-fuchsia-500/5 p-6">
          <div className="text-sm uppercase tracking-[0.2em] text-fuchsia-400">Status</div>
          <p className="mt-2 text-white/70">
            Moduł w budowie — implementacja w fazie v0.5.0.
          </p>
        </div>
      </div>
    </main>
  );
}
