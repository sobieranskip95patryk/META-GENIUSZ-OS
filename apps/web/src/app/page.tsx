import Link from "next/link";

const modules = [
  {
    title: "Hip Hop Universe",
    description:
      "Społecznościowa warstwa kultury, muzyki, twórców, marek i collabów.",
    href: "/hhu",
    badge: "Social + Creator",
    accent: "from-cyan-400 to-blue-500",
    icon: "🎤",
  },
  {
    title: "Rocket Fuell Girls",
    description:
      "Visual talent vertical dla modelek, muses, galerii i kampanii premium.",
    href: "/rfg",
    badge: "Visual + Premium",
    accent: "from-pink-400 to-rose-500",
    icon: "🚀",
  },
  {
    title: "AI Studio",
    description:
      "Narzędzia AI do generowania bio, captionów, konceptów i strategii wzrostu.",
    href: "/ai-studio",
    badge: "AI + Growth",
    accent: "from-violet-400 to-purple-500",
    icon: "✨",
  },
  {
    title: "Admin Control",
    description:
      "Panel operacyjny do zarządzania użytkownikami, moderacją i analityką.",
    href: "/admin",
    badge: "Ops + Analytics",
    accent: "from-emerald-400 to-green-500",
    icon: "⚙️",
  },
];

const stats = [
  { label: "Moduły", value: "4" },
  { label: "Pakiety", value: "12" },
  { label: "Mikroserwisy", value: "5" },
  { label: "Modele DB", value: "16" },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(236,72,153,0.18),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.14),transparent_35%)]" />

        <div className="relative mx-auto flex min-h-[85vh] max-w-7xl flex-col justify-center px-6 py-20 md:px-10">
          <div className="animate-fade-in max-w-4xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm tracking-[0.2em] text-white/70 uppercase backdrop-blur">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded bg-gradient-to-br from-pink-500 to-cyan-400 text-[8px] font-black text-white">
                MG
              </span>
              Platform v0.1
            </div>

            <h1 className="max-w-5xl text-5xl font-black leading-[0.95] tracking-tight md:text-7xl lg:text-8xl">
              AI-Powered Creator
              <span className="block bg-gradient-to-r from-pink-500 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
                Operating System
              </span>
            </h1>

            <p className="mt-8 max-w-2xl text-base leading-7 text-white/65 md:text-lg">
              Jedna platforma łącząca AI Core, creator economy, społeczność,
              kulturę, visual branding i moduły premium w architekturze
              gotowej do skalowania.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="#modules"
                className="group rounded-2xl bg-white px-7 py-3.5 text-sm font-semibold text-black transition-all duration-200 hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(236,72,153,0.25)]"
              >
                Explore Modules
                <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
              <a
                href="https://github.com/sobieranskip95patryk/META-GENIUSZ-OS"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-white/10"
              >
                View Repository
              </a>
            </div>

            {/* Quick stats */}
            <div className="mt-14 flex flex-wrap gap-8">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="text-2xl font-black">{s.value}</div>
                  <div className="mt-1 text-xs uppercase tracking-[0.15em] text-white/45">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Modules grid */}
      <section
        className="mx-auto max-w-7xl px-6 py-16 md:px-10"
        id="modules"
      >
        <div className="mb-10">
          <h2 className="text-3xl font-black md:text-4xl">Moduły platformy</h2>
          <p className="mt-3 max-w-lg text-white/55">
            Każdy moduł to niezależna domena — kliknij, aby wejść i zarządzać.
          </p>
        </div>

        <div className="stagger grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {modules.map((m) => (
            <Link
              key={m.title}
              href={m.href}
              className="group relative rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur transition-all duration-300 hover:-translate-y-1.5 hover:border-white/20 hover:bg-white/[0.06] hover:shadow-[0_8px_40px_-12px_rgba(236,72,153,0.15)]"
            >
              <div className="flex items-center justify-between">
                <div className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.2em] text-white/55">
                  {m.badge}
                </div>
                <span className="text-2xl">{m.icon}</span>
              </div>

              <h3 className="mt-5 text-xl font-bold text-white transition-colors group-hover:text-pink-300">
                {m.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-white/55">
                {m.description}
              </p>

              <div
                className={`mt-6 inline-flex items-center gap-1.5 text-sm font-semibold bg-gradient-to-r ${m.accent} bg-clip-text text-transparent`}
              >
                Otwórz moduł
                <span className="inline-block transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>

              {/* Hover glow */}
              <div
                className={`absolute -inset-px rounded-3xl bg-gradient-to-br ${m.accent} opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-[0.07]`}
              />
            </Link>
          ))}
        </div>
      </section>

      {/* Architecture overview */}
      <section className="mx-auto max-w-7xl px-6 pb-20 md:px-10">
        <div className="stagger grid gap-6 rounded-3xl border border-white/10 bg-white/[0.02] p-8 md:grid-cols-3">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-white/40">
              Core
            </div>
            <div className="mt-2 text-xl font-bold">LOGOS / AI Brain</div>
            <p className="mt-2 text-sm leading-6 text-white/50">
              Warstwa orkiestracji, routingu, rekomendacji i inteligencji systemowej.
            </p>
          </div>

          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-white/40">
              Economy
            </div>
            <div className="mt-2 text-xl font-bold">Creator Monetization</div>
            <p className="mt-2 text-sm leading-6 text-white/50">
              Subskrypcje, profile premium, kampanie, współprace i digital growth engine.
            </p>
          </div>

          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-white/40">
              Infrastructure
            </div>
            <div className="mt-2 text-xl font-bold">Monorepo / Scale</div>
            <p className="mt-2 text-sm leading-6 text-white/50">
              Wspólny frontend, backend, pakiety, deployment i architektura gotowa pod rozwój.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}