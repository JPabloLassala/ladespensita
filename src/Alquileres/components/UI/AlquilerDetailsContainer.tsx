export function AlquilerDetailsContainer({ children }: { children: React.ReactNode }) {
  return (
    <div
      id="alquiler-details"
      style={{
        minHeight: "100%",
        maxHeight: "100%",
        width: "100%",
        overflow: "hidden",
      }}
    >
      <div
        id="alquiler-details-content"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          height: "100%",
          width: "100%",
          overflow: "hidden",
        }}
      >
        {children}
      </div>
    </div>
  );
}
