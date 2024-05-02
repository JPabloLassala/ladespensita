import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./main.css";
import { PageContextProvider } from "./stores/Page.context";
import { ProductsContextProvider } from "./stores/Products.context";
import { AlquileresContextProvider } from "./stores/Alquileres.context";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PageContextProvider>
      <AlquileresContextProvider>
        <ProductsContextProvider>
          <App />
        </ProductsContextProvider>
      </AlquileresContextProvider>
    </PageContextProvider>
  </React.StrictMode>,
);
