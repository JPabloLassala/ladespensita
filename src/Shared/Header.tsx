import { Group } from "@mantine/core";

export function Header({ children }: { children: React.ReactNode }) {
  return (
    <Group id="header" h="5rem" align="center" justify="space-between" px="md">
      {children}
    </Group>
  );
}
