import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./main.css";
import { AppStateProvider } from "@stores/AppState.context.tsx";
import { AlquileresContextProvider, ProductsContextProvider } from "@stores";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppStateProvider>
      <AlquileresContextProvider>
        <ProductsContextProvider>
          <App />
        </ProductsContextProvider>
      </AlquileresContextProvider>
    </AppStateProvider>
  </React.StrictMode>,
);
