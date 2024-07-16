import { AccountHeader, Header, Hero, Layout, Navbar } from "@Shared";
import { Outlet } from "react-router-dom";

export function RootPage() {
  return (
    <Layout>
      <Header>
        <Hero />
        <Navbar />
        <AccountHeader />
      </Header>
      <Outlet />
    </Layout>
  );
}
