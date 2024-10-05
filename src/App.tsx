import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ProductosPage } from "./Productos/pages/Productos.page";
import { RootPage } from "./Shared/Root.page";
import { AlquileresPage } from "./Alquileres";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    children: [
      { index: true, element: <ProductosPage /> },
      { path: "/productos", element: <ProductosPage /> },
      { path: "/alquileres", element: <AlquileresPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
