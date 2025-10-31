import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "@mantine/core/styles.css";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "./main.css";
import "@mantine/dropzone/styles.css";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { AppStateProvider } from "./Common/index.ts";
import { AlquilerContextProvider, AlquilerProductoContextProvider } from "./Alquileres/index.ts";
import { ProductosContextProvider } from "./Productos/index.ts";

dayjs.extend(utc);
dayjs.extend(timezone);
console.log("VITE_API_HOST", import.meta.env.VITE_API_HOST);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppStateProvider>
      <AlquilerContextProvider>
        <AlquilerProductoContextProvider>
          <ProductosContextProvider>
            <App />
          </ProductosContextProvider>
        </AlquilerProductoContextProvider>
      </AlquilerContextProvider>
    </AppStateProvider>
  </React.StrictMode>,
);
