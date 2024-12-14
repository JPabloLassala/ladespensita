import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "@mantine/core/styles.css";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { AppStateProvider } from "./Common/index.ts";
import { AlquileresContextProvider } from "./Alquileres/index.ts";
import { ProductosContextProvider } from "./Productos/index.ts";

dayjs.extend(utc);
dayjs.extend(timezone);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppStateProvider>
      <AlquileresContextProvider>
        <ProductosContextProvider>
          <App />
        </ProductosContextProvider>
      </AlquileresContextProvider>
    </AppStateProvider>
  </React.StrictMode>,
);
