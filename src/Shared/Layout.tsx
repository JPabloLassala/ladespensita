import { Stack } from "@mantine/core";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Stack id="layout" mah="100%" gap="1rem" w="100%" h="100%">
      {children}
    </Stack>
  );
}
