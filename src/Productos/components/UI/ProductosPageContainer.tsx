import { Stack } from "@mantine/core";

export function ProductosPageContainer({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <Stack id="AAA" align="center" w="100%">
        {children}
      </Stack>
    </main>
  );
}
