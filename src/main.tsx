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
import { AppStateProvider, FilterContextProvider } from "./Common/index.ts";
import { AlquilerContextProvider, AlquilerProductoContextProvider } from "./Alquileres/index.ts";
import { ProductosContextProvider } from "./Productos/index.ts";

dayjs.extend(utc);
dayjs.extend(timezone);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppStateProvider>
      <AlquilerContextProvider>
        <AlquilerProductoContextProvider>
          <FilterContextProvider>
            <ProductosContextProvider>
              <App />
            </ProductosContextProvider>
          </FilterContextProvider>
        </AlquilerProductoContextProvider>
      </AlquilerContextProvider>
    </AppStateProvider>
  </React.StrictMode>,
);
