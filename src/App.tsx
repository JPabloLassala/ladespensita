import { FilterContextProvider } from "./stores/Filter.context";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Header } from "./Shared/Header";
import { ProductosPage } from "./Productos/Productos.page";
import { Layout } from "./Shared/Layout";
import { Hero } from "./Shared/Hero";
import { Navbar } from "./Shared/Navbar";
import { AccountHeader } from "./Shared/AccountHeader";
import { Alquileres } from "./Alquileres/Alquileres.page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProductosPage />,
  },
  {
    path: "/productos",
    element: <ProductosPage />,
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
