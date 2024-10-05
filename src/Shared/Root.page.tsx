import { Outlet } from "react-router-dom";
import { Layout } from "./Layout";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { Navbar } from "./Navbar";
import { AccountHeader } from "./AccountHeader";

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
