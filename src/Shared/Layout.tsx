import { AppShell } from "@mantine/core";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell withBorder={false} header={{ height: 80 }} padding="md">
      {children}
    </AppShell>
  );
}
