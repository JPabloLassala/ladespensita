export function AlquilerDetailsContainer({ children }: { children: React.ReactNode }) {
  return (
    <div
      id="alquiler-details"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        height: "100%",
      }}
    >
      {children}
    </div>
  );
}
