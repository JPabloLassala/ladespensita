import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

export function Layout({ children }: { children: React.ReactNode }) {
  const [opened, { toggle }] = useDisclosure();
  //   return (
  //     <div id="layout" className="flex h-screen flex-col px-10 items-center">
  //       {children}
  //     </div>
  //   );
  return (
    <AppShell
      withBorder={false}
      header={{ height: 80 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      {children}
    </AppShell>
  );
}
