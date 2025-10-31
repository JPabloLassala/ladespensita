import { Flex } from "@mantine/core";

export function AlquilerProductosScrollContainer({ children }: { children: React.ReactNode }) {
  return (
    <Flex
      component="div"
      direction="column"
      h="100%"
      gap="1rem"
      w="100%"
      id="alquiler-productos-scroll-container"
      style={{ overflowY: "auto" }}
    >
      {children}
    </Flex>
  );
}
