"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

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

export default function ModuleWorkspace({
  moduleKey,
  title,
  subtitle,
  accentClass,
  quickActions,
}: ModuleWorkspaceProps) {
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const [status, setStatus] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [settings, setSettings] = useState<ModuleSettings>(defaultSettings);

  const tasksStorageKey = `${moduleKey}:tasks`;
  const settingsStorageKey = `${moduleKey}:settings`;

  useEffect(() => {
    const rawTasks = localStorage.getItem(tasksStorageKey);
    const rawSettings = localStorage.getItem(settingsStorageKey);

    if (rawTasks) {
      try {
        const parsed = JSON.parse(rawTasks) as Task[];
        setTasks(parsed);
      } catch {
        setTasks([]);
      }
    }

    if (rawSettings) {
      try {
        const parsed = JSON.parse(rawSettings) as ModuleSettings;
        setSettings(parsed);
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
  const completedTasks = useMemo(() => tasks.filter((task) => task.done).length, [tasks]);

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
    setStatus("Dodano nowe zadanie.");
  }

  function toggleTask(id: string) {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, done: !task.done } : task)),
    );
  }

  function removeTask(id: string) {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }

  function runAction(action: string) {
    setStatus(`Wykonano akcję: ${action}`);
  }

  function setSetting<K extends keyof ModuleSettings>(key: K, value: ModuleSettings[K]) {
    setSettings((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <main className="min-h-screen bg-black px-6 py-12 text-white">
      <div className="mx-auto max-w-6xl">
        <Link href="/" className="text-sm text-cyan-300 hover:text-cyan-200">
          ← Back to META-GENIUSZ OS
        </Link>

        <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-4xl font-black md:text-5xl">{title}</h1>
              <p className="mt-3 max-w-2xl text-white/70">{subtitle}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {quickActions.map((action) => (
                <button
                  key={action.value}
                  onClick={() => runAction(action.label)}
                  className={`rounded-xl border border-white/15 px-4 py-2 text-sm font-semibold transition hover:border-white/35 ${accentClass}`}
                >
                  {action.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <TabButton
              active={activeTab === "overview"}
              onClick={() => setActiveTab("overview")}
              label="Overview"
            />
            <TabButton
              active={activeTab === "workflow"}
              onClick={() => setActiveTab("workflow")}
              label="Workflow"
            />
            <TabButton
              active={activeTab === "settings"}
              onClick={() => setActiveTab("settings")}
              label="Settings"
            />
          </div>

          {status ? (
            <div className="mt-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-300">
              {status}
            </div>
          ) : null}
        </div>

        {activeTab === "overview" && (
          <section className="mt-6 grid gap-4 md:grid-cols-3">
            <InfoCard title="Liczba zadań" value={String(totalTasks)} />
            <InfoCard title="Ukończone" value={String(completedTasks)} />
            <InfoCard
              title="Postęp"
              value={totalTasks === 0 ? "0%" : `${Math.round((completedTasks / totalTasks) * 100)}%`}
            />
          </section>
        )}

        {activeTab === "workflow" && (
          <section className="mt-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <h2 className="text-xl font-bold">Zadania modułu</h2>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <input
                value={newTask}
                onChange={(event) => setNewTask(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") addTask();
                }}
                placeholder="Dodaj nowe zadanie"
                className="w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-white/40"
              />
              <button
                onClick={addTask}
                className={`rounded-xl px-4 py-3 text-sm font-semibold text-black ${accentClass}`}
              >
                Dodaj
              </button>
            </div>

            <ul className="mt-5 space-y-2">
              {tasks.map((task) => (
                <li
                  key={task.id}
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3"
                >
                  <button
                    onClick={() => toggleTask(task.id)}
                    className={`text-left text-sm ${task.done ? "text-white/40 line-through" : "text-white/90"}`}
                  >
                    {task.text}
                  </button>
                  <button
                    onClick={() => removeTask(task.id)}
                    className="text-xs text-red-300 hover:text-red-200"
                  >
                    Usuń
                  </button>
                </li>
              ))}
              {tasks.length === 0 && <li className="text-sm text-white/50">Brak zadań.</li>}
            </ul>
          </section>
        )}

        {activeTab === "settings" && (
          <section className="mt-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <h2 className="text-xl font-bold">Opcje modułu</h2>

            <div className="mt-5 space-y-3">
              <ToggleRow
                label="Powiadomienia"
                checked={settings.notifications}
                onChange={(value) => setSetting("notifications", value)}
              />
              <ToggleRow
                label="Auto-zapis"
                checked={settings.autoSave}
                onChange={(value) => setSetting("autoSave", value)}
              />
              <ToggleRow
                label="Tryb kompaktowy"
                checked={settings.compactMode}
                onChange={(value) => setSetting("compactMode", value)}
              />
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

function TabButton({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-xl px-4 py-2 text-sm transition ${
        active ? "bg-white text-black" : "bg-white/10 text-white hover:bg-white/20"
      }`}
    >
      {label}
    </button>
  );
}

function InfoCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <div className="text-sm text-white/60">{title}</div>
      <div className="mt-2 text-3xl font-black">{value}</div>
    </div>
  );
}

function ToggleRow({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3">
      <span className="text-sm">{label}</span>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`rounded-full px-3 py-1 text-xs font-semibold ${
          checked ? "bg-emerald-400 text-black" : "bg-white/15 text-white"
        }`}
      >
        {checked ? "ON" : "OFF"}
      </button>
    </label>
  );
}
