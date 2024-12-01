import { Outlet } from "react-router-dom";
import { Layout } from "./Layout";
import { Header } from "./Header";
import { Hero } from "./Hero";
// import { Navbar } from "./Navbar";
import { AccountHeader } from "./AccountHeader";
import { AppShell, MantineProvider } from "@mantine/core";

export function RootPage() {
  return (
    <MantineProvider>
      <Layout>
        <Header>
          <Hero />
          {/* <Navbar /> */}
          <AccountHeader />
        </Header>
        <AppShell.Main>
          <Outlet />
        </AppShell.Main>
      </Layout>
    </MantineProvider>
  );
}
