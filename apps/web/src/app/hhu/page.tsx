import ModuleWorkspace from "../../components/module-workspace";

export default function HHUPage() {
  return (
    <ModuleWorkspace
      moduleKey="hhu"
      title="Hip Hop Universe"
      subtitle="Moduł dla artystów, fanów, marek, contentu, collabów i społeczności."
      accentClass="bg-cyan-300"
      quickActions={[
        { label: "Nowy post", value: "new-post" },
        { label: "Live room", value: "live-room" },
        { label: "Analiza trendów", value: "trends" },
      ]}
    />
  );
}