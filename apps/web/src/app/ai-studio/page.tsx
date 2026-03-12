import ModuleWorkspace from "../../components/module-workspace";

export default function AIStudioPage() {
  return (
    <ModuleWorkspace
      moduleKey="ai-studio"
      title="AI Studio"
      subtitle="Generator bio, captionów, kampanii, koncepcji i narzędzi wzrostu dla creatorów."
      accentClass="bg-violet-300"
      quickActions={[
        { label: "Nowy prompt", value: "new-prompt" },
        { label: "Generuj bio", value: "generate-bio" },
        { label: "Eksport wyników", value: "export-results" },
      ]}
    />
  );
}