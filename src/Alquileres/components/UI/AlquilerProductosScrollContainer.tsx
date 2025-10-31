import { Flex } from "@mantine/core";

export function AlquilerProductosScrollContainer({ children }: { children: React.ReactNode }) {
  return (
    <div
      id="alquiler-productos-scroll-container"
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        gap: "1rem",
        overflowY: "auto",
      }}
    >
      <Flex direction="column" gap="0.5rem" style={{ flexShrink: 1, width: "100%" }}>
        {children}
      </Flex>
    </div>
  );
}
