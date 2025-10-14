import { Flex } from "@mantine/core";

export function AlquilerListContainer({ children }: { children: React.ReactNode }) {
  return (
    <Flex id="alquiler-sidebar" direction="column" w="450px" gap="md">
      {children}
    </Flex>
  );
}
