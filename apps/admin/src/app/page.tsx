export default function Home() {
  const sections = [
    {
      title: "Użytkownicy",
      desc: "Zarządzanie kontami, rolami, weryfikacją i dostępami.",
      badge: "Users",
      color: "border-blue-400/30 bg-blue-400/5 text-blue-300",
    },
    {
      title: "Moderacja",
      desc: "Kolejka treści do przeglądu, flagowanie postów, historia decyzji.",
      badge: "Moderation",
      color: "border-orange-400/30 bg-orange-400/5 text-orange-300",
    },
    {
      title: "Analityka",
      desc: "DAU/MAU, wzrost rejestracji, engagement rate, przychody.",
      badge: "Analytics",
      color: "border-green-400/30 bg-green-400/5 text-green-300",
    },
    {
      title: "System",
      desc: "Logi, status serwisów, feature flags, backup danych.",
      badge: "Ops",
      color: "border-purple-400/30 bg-purple-400/5 text-purple-300",
    },
  ];

  return (
    <main className="min-h-screen bg-black px-6 py-16 text-white">
      <div className="mx-auto max-w-5xl">
        <a href="http://localhost:3000" className="text-sm text-cyan-300">
          ← Back to META-GENIUSZ OS
        </a>

        <div className="mt-6 inline-flex items-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm tracking-[0.2em] text-white/70 uppercase backdrop-blur">
          Ops + Analytics
        </div>

        <h1 className="mt-6 text-5xl font-black">Admin Control</h1>

        <p className="mt-4 max-w-2xl text-white/70 text-lg leading-7">
          Operacyjna warstwa zarządzania użytkownikami, moderacją, insightami i KPI platformy META-GENIUSZ OS.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {sections.map((s) => (
            <div
              key={s.title}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur"
            >
              <div className={`inline-flex rounded-full border px-3 py-1 text-xs uppercase tracking-[0.2em] ${s.color}`}>
                {s.badge}
              </div>
              <h2 className="mt-4 text-xl font-bold">{s.title}</h2>
              <p className="mt-2 text-sm leading-6 text-white/60">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-3xl border border-orange-500/20 bg-orange-500/5 p-6">
          <div className="text-sm uppercase tracking-[0.2em] text-orange-400">⚠ Dostęp chroniony</div>
          <p className="mt-2 text-white/70">
            Panel administracyjny wymaga uwierzytelniania. Implementacja auth w fazie v0.2.0.
          </p>
        </div>
      </div>
    </main>
  );
}
