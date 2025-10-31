import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ProductosPage } from "./Productos/pages/Productos.page";
import { RootPage } from "./Shared/Root.page";
import { AlquileresPage } from "./Alquileres";
import { PrivateRoute } from "./Auth/components/PrivateRoute";
import { LoginPage } from "./Auth";
import {
  AlquilerProductoContext,
  AlquilerProductoContextProvider,
} from "./Alquileres/stores/AlquilerProducto.context";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <ProductosPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/productos",
        element: (
          <PrivateRoute>
            <ProductosPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/alquileres",
        element: (
          <PrivateRoute>
            <AlquileresPage />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
