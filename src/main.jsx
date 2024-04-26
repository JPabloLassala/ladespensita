import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./main.css";
import { PageContextProvider } from "./stores/Page.context.jsx";
import { ProductsContextProvider } from "./stores/Products.context.jsx";
import { AlquileresContextProvider } from "./stores/Alquileres.context.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
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
