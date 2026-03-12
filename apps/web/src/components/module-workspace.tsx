"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useToast } from "./toast";

type TabId = "overview" | "workflow" | "settings";

type ModuleWorkspaceProps = {
  moduleKey: string;
  title: string;
  subtitle: string;
  accentClass: string;
  quickActions: Array<{ label: string; value: string }>;
};

type Task = {
  id: string;
  text: string;
  done: boolean;
};

type ModuleSettings = {
  notifications: boolean;
  autoSave: boolean;
  compactMode: boolean;
};

const defaultSettings: ModuleSettings = {
  notifications: true,
  autoSave: true,
  compactMode: false,
};

const TAB_CONFIG: { id: TabId; label: string; icon: string }[] = [
  { id: "overview", label: "Overview", icon: "📊" },
  { id: "workflow", label: "Workflow", icon: "📋" },
  { id: "settings", label: "Settings", icon: "⚙️" },
];

export default function ModuleWorkspace({
  moduleKey,
  title,
  subtitle,
  accentClass,
  quickActions,
}: ModuleWorkspaceProps) {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [settings, setSettings] = useState<ModuleSettings>(defaultSettings);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const tasksStorageKey = `${moduleKey}:tasks`;
  const settingsStorageKey = `${moduleKey}:settings`;

  useEffect(() => {
    const rawTasks = localStorage.getItem(tasksStorageKey);
    const rawSettings = localStorage.getItem(settingsStorageKey);

    if (rawTasks) {
      try {
        setTasks(JSON.parse(rawTasks) as Task[]);
      } catch {
        setTasks([]);
      }
    }

    if (rawSettings) {
      try {
        setSettings(JSON.parse(rawSettings) as ModuleSettings);
      } catch {
        setSettings(defaultSettings);
      }
    }
  }, [tasksStorageKey, settingsStorageKey]);

  useEffect(() => {
    localStorage.setItem(tasksStorageKey, JSON.stringify(tasks));
  }, [tasks, tasksStorageKey]);

  useEffect(() => {
    localStorage.setItem(settingsStorageKey, JSON.stringify(settings));
  }, [settings, settingsStorageKey]);

  const totalTasks = tasks.length;
  const completedTasks = useMemo(
    () => tasks.filter((t) => t.done).length,
    [tasks],
  );
  const progressPct =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  function addTask() {
    const text = newTask.trim();
    if (!text) return;

    const task: Task = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      text,
      done: false,
    };

    setTasks((prev) => [task, ...prev]);
    setNewTask("");
    toast("Dodano zadanie", "success");
  }

  function toggleTask(id: string) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
    );
  }

  function removeTask(id: string) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    toast("Usunięto zadanie", "info");
  }

  function runAction(action: string) {
    setActionLoading(action);
    // Simulate async action
    setTimeout(() => {
      setActionLoading(null);
      toast(`Wykonano: ${action}`, "success");
    }, 600);
  }

  function setSetting<K extends keyof ModuleSettings>(
    key: K,
    value: ModuleSettings[K],
  ) {
    setSettings((prev) => ({ ...prev, [key]: value }));
    toast(`Zaktualizowano ustawienie`, "info");
  }

  return (
    <main className="min-h-screen bg-[#050505] px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl animate-fade-in">
        {/* Breadcrumb */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-white/50 transition hover:text-white/80"
        >
          <span>←</span> META-GENIUSZ OS
        </Link>

        {/* Module header */}
        <div className="mt-5 rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-black md:text-5xl">{title}</h1>
              <p className="mt-3 max-w-2xl text-white/60">{subtitle}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {quickActions.map((action) => (
                <button
                  key={action.value}
                  onClick={() => runAction(action.label)}
                  disabled={actionLoading === action.label}
                  className={`rounded-xl border border-white/15 px-4 py-2 text-sm font-semibold text-black transition-all duration-200 hover:scale-[1.03] hover:border-white/30 disabled:opacity-50 ${accentClass}`}
                >
                  {actionLoading === action.label ? (
                    <span className="inline-flex items-center gap-1.5">
                      <span className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-black/30 border-t-black" />
                      ...
                    </span>
                  ) : (
                    action.label
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-6 flex flex-wrap gap-1.5">
            {TAB_CONFIG.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-white text-black shadow-lg shadow-white/5"
                    : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
                }`}
              >
                <span className="mr-1.5">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab content with slide animation */}
        <div className="mt-5 animate-fade-in" key={activeTab}>
          {activeTab === "overview" && (
            <div className="stagger">
              {/* Stats cards */}
              <div className="grid gap-4 sm:grid-cols-3">
                <StatCard
                  label="Zadania"
                  value={String(totalTasks)}
                  icon="📋"
                />
                <StatCard
                  label="Ukończone"
                  value={String(completedTasks)}
                  icon="✅"
                />
                <StatCard
                  label="Postęp"
                  value={`${progressPct}%`}
                  icon="📈"
                  extra={
                    <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-pink-500 to-cyan-400 transition-all duration-500"
                        style={{ width: `${progressPct}%` }}
                      />
                    </div>
                  }
                />
              </div>

              {/* Quick overview */}
              <div className="mt-5 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                <h3 className="text-lg font-bold">Ostatnie zadania</h3>
                {tasks.length === 0 ? (
                  <p className="mt-3 text-sm text-white/40">
                    Brak zadań. Przejdź do zakładki Workflow, aby dodać.
                  </p>
                ) : (
                  <ul className="mt-3 space-y-2">
                    {tasks.slice(0, 5).map((task) => (
                      <li
                        key={task.id}
                        className="flex items-center gap-3 text-sm"
                      >
                        <span
                          className={`inline-flex h-5 w-5 items-center justify-center rounded-full text-[10px] ${
                            task.done
                              ? "bg-emerald-500/20 text-emerald-400"
                              : "bg-white/10 text-white/40"
                          }`}
                        >
                          {task.done ? "✓" : "○"}
                        </span>
                        <span
                          className={
                            task.done
                              ? "text-white/40 line-through"
                              : "text-white/80"
                          }
                        >
                          {task.text}
                        </span>
                      </li>
                    ))}
                    {tasks.length > 5 && (
                      <li className="text-xs text-white/40">
                        + {tasks.length - 5} więcej…
                      </li>
                    )}
                  </ul>
                )}
              </div>
            </div>
          )}

          {activeTab === "workflow" && (
            <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
              <h2 className="text-xl font-bold">Zadania modułu</h2>

              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <input
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") addTask();
                  }}
                  placeholder="Dodaj nowe zadanie…"
                  className="w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-white/40 focus:bg-black/60"
                />
                <button
                  onClick={addTask}
                  className={`shrink-0 rounded-xl px-5 py-3 text-sm font-semibold text-black transition-all duration-200 hover:scale-[1.03] ${accentClass}`}
                >
                  Dodaj
                </button>
              </div>

              <ul className="mt-5 space-y-2">
                {tasks.map((task) => (
                  <li
                    key={task.id}
                    className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 transition-colors hover:bg-white/[0.04]"
                  >
                    <button
                      onClick={() => toggleTask(task.id)}
                      className="flex items-center gap-3 text-left text-sm"
                    >
                      <span
                        className={`inline-flex h-5 w-5 items-center justify-center rounded-full border transition-all ${
                          task.done
                            ? "border-emerald-500/50 bg-emerald-500/20 text-emerald-400"
                            : "border-white/20 text-transparent hover:border-white/40"
                        }`}
                      >
                        {task.done ? "✓" : ""}
                      </span>
                      <span
                        className={
                          task.done
                            ? "text-white/40 line-through"
                            : "text-white/90"
                        }
                      >
                        {task.text}
                      </span>
                    </button>
                    <button
                      onClick={() => removeTask(task.id)}
                      className="text-xs text-white/30 opacity-0 transition-opacity group-hover:opacity-100 hover:text-red-400"
                    >
                      Usuń
                    </button>
                  </li>
                ))}
                {tasks.length === 0 && (
                  <li className="py-8 text-center text-sm text-white/40">
                    Brak zadań — dodaj pierwsze powyżej.
                  </li>
                )}
              </ul>
            </section>
          )}

          {activeTab === "settings" && (
            <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
              <h2 className="text-xl font-bold">Opcje modułu</h2>

              <div className="mt-5 space-y-3">
                <ToggleRow
                  label="Powiadomienia"
                  description="Otrzymuj alerty o nowych zadaniach i zdarzeniach."
                  checked={settings.notifications}
                  onChange={(v) => setSetting("notifications", v)}
                />
                <ToggleRow
                  label="Auto-zapis"
                  description="Automatycznie zapisuj zmiany w tle."
                  checked={settings.autoSave}
                  onChange={(v) => setSetting("autoSave", v)}
                />
                <ToggleRow
                  label="Tryb kompaktowy"
                  description="Mniej odstępów, więcej treści na ekranie."
                  checked={settings.compactMode}
                  onChange={(v) => setSetting("compactMode", v)}
                />
              </div>
            </section>
          )}
        </div>
      </div>
    </main>
  );
}

function StatCard({
  label,
  value,
  icon,
  extra,
}: {
  label: string;
  value: string;
  icon: string;
  extra?: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <div className="flex items-center justify-between">
        <div className="text-sm text-white/50">{label}</div>
        <span className="text-lg">{icon}</span>
      </div>
      <div className="mt-2 text-3xl font-black">{value}</div>
      {extra}
    </div>
  );
}

function ToggleRow({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] px-5 py-4 transition-colors hover:bg-white/[0.04]">
      <div>
        <div className="text-sm font-medium">{label}</div>
        <div className="mt-0.5 text-xs text-white/40">{description}</div>
      </div>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 rounded-full transition-colors duration-200 ${
          checked ? "bg-emerald-500" : "bg-white/15"
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}
        }`}
      >
        {checked ? "ON" : "OFF"}
      </button>
    </label>
  );
}
