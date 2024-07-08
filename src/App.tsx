import { AccountHeader } from "./components/UI/AccountHeader";
import { Productos } from "./pages/Productos";
import { Header } from "./components/Header";
import { Hero } from "./components/UI/Hero";
import { Layout } from "./components/UI/Layout";
import { Navbar } from "./components/UI/Navbar";
import { Alquileres } from "./pages/Alquileres";
import { FilterContextProvider } from "./stores/Filter.context";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Productos />,
  },
  {
    path: "/productos",
    element: <Productos />,
  },
  {
    path: "/alquileres",
    element: <Alquileres />,
  },
]);

function App() {
  return (
    <Layout>
      <Header>
        <Hero />
        <Navbar />
        <AccountHeader />
      </Header>
      <FilterContextProvider>
        <RouterProvider router={router} />
      </FilterContextProvider>
    </Layout>
  );
}

export default App;
