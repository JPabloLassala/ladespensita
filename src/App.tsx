import { AccountHeader } from "./components/UI/AccountHeader";
import { Galeria } from "./pages/Galeria";
import { Header } from "./components/Header";
import { Hero } from "./components/UI/Hero";
import { Layout } from "./components/UI/Layout";
import { Navbar } from "./components/UI/Navbar";
import { useContext } from "react";
import { PAGES, PageContext } from "./stores/Page.context";
import { Alquileres } from "./pages/Alquileres";
import { FilterContextProvider } from "./stores/Filter.context";

function App() {
  const { page } = useContext(PageContext)!;

  return (
    <Layout>
      <Header>
        <Hero />
        <Navbar />
        <AccountHeader />
      </Header>
      <FilterContextProvider>
        {page === PAGES.productos && <Galeria />}
        {page === PAGES.alquileres && <Alquileres />}
      </FilterContextProvider>
    </Layout>
  );
}

export default App;
