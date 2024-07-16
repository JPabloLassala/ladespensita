import { AlquilerDetailsContainer, AlquilerIDLoader, AlquilerNoneSelected } from "@Alquileres/UI";
import { RootPage } from "@Shared/Root.page";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ProductosPage } from "./Productos/Productos.page";
import { AlquileresRoot } from "@Alquileres/AlquileresRoot.page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    children: [
      { index: true, element: <ProductosPage /> },
      { path: "/productos", element: <ProductosPage /> },
      {
        path: "/alquileres",
        element: <AlquileresRoot />,
        children: [
          {
            index: true,
            element: <AlquilerNoneSelected />,
          },
          {
            path: ":alquilerId",
            id: "alquiler-detail",
            children: [{ index: true, element: <AlquilerDetailsContainer /> }],
            loader: AlquilerIDLoader,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
