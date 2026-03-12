import ModuleWorkspace from "../../components/module-workspace";

export default function RFGPage() {
  return (
    <ModuleWorkspace
      moduleKey="rfg"
      title="Rocket Fuell Girls"
      subtitle="Moduł visual talent, galerii, portfolio, discoverability i kampanii premium."
      accentClass="bg-pink-300"
      quickActions={[
        { label: "Nowa galeria", value: "new-gallery" },
        { label: "Dodaj portfolio", value: "new-portfolio" },
        { label: "Kampania premium", value: "premium-campaign" },
      ]}
    />
  );
}