import ModuleWorkspace from "../../components/module-workspace";

export default function AdminPage() {
  return (
    <ModuleWorkspace
      moduleKey="admin"
      title="Admin Control"
      subtitle="Operacyjna warstwa zarządzania użytkownikami, moderacją, insightami i KPI."
      accentClass="bg-emerald-300"
      quickActions={[
        { label: "Nowy alert", value: "new-alert" },
        { label: "Przegląd zgłoszeń", value: "review-reports" },
        { label: "Eksport KPI", value: "export-kpi" },
      ]}
    />
  );
}