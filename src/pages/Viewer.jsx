import PresentationViewer from "../components/PresentationViewer";

function Viewer({
  capacitacion,
  visitor,
  visitaId,
  onExit,
}) {
  return (
    <PresentationViewer
      capacitacion={capacitacion}
      visitor={visitor}
      visitaId={visitaId}
      onExit={onExit}
    />
  );
}

export default Viewer;