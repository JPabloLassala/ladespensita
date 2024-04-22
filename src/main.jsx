import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./main.css";
import { PageContextProvider } from "./stores/Page.context.jsx";
import { ProductsContextProvider } from "./stores/Products.context.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PageContextProvider>
      <ProductsContextProvider>
        <App />
      </ProductsContextProvider>
    </PageContextProvider>
  </React.StrictMode>,
);
