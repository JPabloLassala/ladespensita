export function AlquilerDetailsContainer({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        minHeight: "100%",
        maxHeight: "100%",
        width: "100%",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          minHeight: "100%",
          maxHeight: "100%",
          width: "100%",
          overflow: "hidden",
        }}
      >
        {children}
      </div>
    </div>
  );
}
