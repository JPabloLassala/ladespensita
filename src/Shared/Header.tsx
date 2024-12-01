import { AppShell, Avatar, Flex, Group } from "@mantine/core";

export function Header({ children }: { children: React.ReactNode }) {
  // return (
  //   <header className="w-full font-header">
  //     <div className="items-top flex flex-row justify-between py-5">{children}</div>
  //   </header>
  // );
  return (
    <AppShell.Header>
      <Group h="100%" align="center" justify="space-between" px="md">
        {children}
      </Group>
    </AppShell.Header>
  );
}
