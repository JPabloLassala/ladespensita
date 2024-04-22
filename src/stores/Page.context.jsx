import { createContext, useState } from "react";

export const PageContext = createContext({
  progress: "",
  showProductDetails: () => {},
  hideProductDetails: () => {},
});

export function PageContextProvider({ children }) {
  const [page, setPage] = useState("");

  function showProductDetails() {
    setPage("productDetails");
  }

  function hideProductDetails() {
    setPage("");
  }

  const pageCtx = {
    progress: page,
    showProductDetails,
    hideProductDetails,
  };

  return <PageContext.Provider value={pageCtx}>{children}</PageContext.Provider>;
}
