import { AccountHeader } from "./components/UI/AccountHeader";
import { Gallery } from "./components/UI/Gallery";
import { Header } from "./components/UI/Header";
import { Hero } from "./components/UI/Hero";
import { Layout } from "./components/UI/Layout";
import { Navbar } from "./components/UI/Navbar";

function App() {
  return (
    <Layout>
      <Header>
        <Hero />
        <Navbar />
        <AccountHeader />
      </Header>
      <Gallery />
    </Layout>
  );
}

export default App;
