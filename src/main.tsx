import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./main.css";
import { AppStateProvider } from "@stores/AppState.context.tsx";
import { AlquileresContextProvider, ProductsContextProvider } from "@stores";

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
