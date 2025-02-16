import { Title } from "@mantine/core";

export function AlquilerProductosContainer({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        minHeight: "100%",
        maxHeight: "100%",
        width: "100%",
      }}
    >
      <Title order={3}>Productos</Title>
      {children}
    </div>
  );
}
