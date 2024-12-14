import { AppShell } from "@mantine/core";

export function AlquilerPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell
      navbar={{
        width: 350,
        breakpoint: "sm",
      }}
      withBorder={false}
      padding="md"
    >
      {children}
    </AppShell>
  );
}
