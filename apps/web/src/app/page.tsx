export default function HomePage() {
  const modules = [
    {
      title: "Hip Hop Universe",
      description:
        "Społecznościowa warstwa kultury, muzyki, twórców, marek i collabów.",
      href: "/hhu",
      badge: "Social + Creator",
    },
    {
      title: "Rocket Fuell Girls",
      description:
        "Visual talent vertical dla modelek, muses, galerii i kampanii premium.",
      href: "/rfg",
      badge: "Visual + Premium",
    },
    {
      title: "AI Studio",
      description:
        "Narzędzia AI do generowania bio, captionów, konceptów i strategii wzrostu.",
      href: "/ai-studio",
      badge: "AI + Growth",
    },
    {
      title: "Admin Control",
      description:
        "Panel operacyjny do zarządzania użytkownikami, moderacją i analityką.",
      href: "/admin",
      badge: "Ops + Analytics",
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(236,72,153,0.22),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.18),transparent_30%)]" />
        <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-16 md:px-10">
          <div className="max-w-4xl">
            <div className="mb-6 inline-flex items-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm tracking-[0.2em] text-white/70 uppercase backdrop-blur">
              META-GENIUSZ OS
            </div>

            <h1 className="max-w-5xl text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">
              AI-Powered Creator
              <span className="block bg-gradient-to-r from-pink-500 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
                Operating System
              </span>
            </h1>

            <p className="mt-8 max-w-2xl text-base leading-7 text-white/70 md:text-lg">
              Jedna platforma łącząca AI Core, creator economy, społeczność,
              kulturę, visual branding i moduły premium w architekturze
              gotowej do skalowania.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#modules"
                className="rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-black transition hover:scale-[1.02]"
              >
                Explore Modules
              </a>
              <a
                href="https://github.com/sobieranskip95patryk/META-GENIUSZ-OS"
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                View Repository
              </a>
            </div>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 xl:grid-cols-4" id="modules">
            {modules.map((module) => (
              <a
                key={module.title}
                href={module.href}
                className="group rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-pink-400/40 hover:bg-white/[0.07]"
              >
                <div className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.2em] text-white/60">
                  {module.badge}
                </div>

                <h2 className="mt-5 text-2xl font-bold text-white group-hover:text-pink-300">
                  {module.title}
                </h2>

                <p className="mt-3 text-sm leading-6 text-white/65">
                  {module.description}
                </p>

                <div className="mt-6 text-sm font-semibold text-cyan-300">
                  Enter module →
                </div>
              </a>
            ))}
          </div>

          <div className="mt-14 grid gap-6 rounded-3xl border border-white/10 bg-white/[0.03] p-8 md:grid-cols-3">
            <div>
              <div className="text-sm uppercase tracking-[0.2em] text-white/45">
                Core
              </div>
              <div className="mt-2 text-xl font-semibold">LOGOS / AI Brain</div>
              <p className="mt-2 text-sm leading-6 text-white/60">
                Warstwa orkiestracji, routingu, rekomendacji i inteligencji
                systemowej.
              </p>
            </div>

            <div>
              <div className="text-sm uppercase tracking-[0.2em] text-white/45">
                Economy
              </div>
              <div className="mt-2 text-xl font-semibold">Creator Monetization</div>
              <p className="mt-2 text-sm leading-6 text-white/60">
                Subskrypcje, profile premium, kampanie, współprace i digital
                growth engine.
              </p>
            </div>

            <div>
              <div className="text-sm uppercase tracking-[0.2em] text-white/45">
                Infrastructure
              </div>
              <div className="mt-2 text-xl font-semibold">Monorepo / Scale</div>
              <p className="mt-2 text-sm leading-6 text-white/60">
                Wspólny frontend, backend, pakiety, deployment i architektura
                gotowa pod rozwój startupowy.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}