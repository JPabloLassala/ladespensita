import { Stack } from "@mantine/core";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Stack mah="100%" gap="1rem" w="100%">
      {children}
    </Stack>
  );
}
