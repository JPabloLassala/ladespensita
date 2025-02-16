import { Flex } from "@mantine/core";

export function AlquilerProductosScrollContainer({ children }: { children: React.ReactNode }) {
  return (
    <Flex direction="row" gap="1rem" mih="100%" mah="100%" style={{ width: "100%" }}>
      <div
        style={{
          width: "50%",
          minHeight: "100%",
          maxHeight: "100%",
          overflow: "scroll",
        }}
      >
        <Flex direction="column" gap="0.5rem" style={{ flexShrink: 1, width: "100%" }}>
          {children}
        </Flex>
      </div>
    </Flex>
  );
}
