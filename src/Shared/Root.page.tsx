import { Outlet } from "react-router-dom";
import { Layout } from "./Layout";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { AccountHeader } from "./AccountHeader";
import { MantineProvider } from "@mantine/core";
import { Navbar } from "./Navbar";

export function RootPage() {
  return (
    <MantineProvider defaultColorScheme="auto">
      <Layout>
        <Header>
          <Hero />
          <Navbar />
          <AccountHeader />
        </Header>
        <Outlet />
      </Layout>
    </MantineProvider>
  );
}
