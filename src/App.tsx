import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ProductosPage } from "./Productos/Productos.page";
import { Alquileres } from "./Alquileres/Alquileres.page";
import { RootPage } from "@Shared/Root.page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    children: [
      { index: true, element: <ProductosPage /> },
      { path: "/productos", element: <ProductosPage /> },
      { path: "/alquileres", element: <Alquileres /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
