import { Stack } from "@mantine/core";

export function AlquilerProductosScrollContainer({ children }: { children: React.ReactNode }) {
  return (
    <Stack
      component="div"
      h="100%"
      gap="1rem"
      w="100%"
      id="alquiler-productos-scroll-container"
      style={{ overflowY: "scroll" }}
    >
      {children}
    </Stack>
  );
}
