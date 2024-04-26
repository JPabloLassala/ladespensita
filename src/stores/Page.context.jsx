import { createContext, useState } from "react";

export const PAGES = {
  productos: "/productos",
  alquileres: "/alquileres",
};

export const PageContext = createContext({
  page: "",
  setPage: () => {},
});

export function PageContextProvider({ children }) {
  const [page, setPage] = useState(PAGES.productos);

  const pageCtx = {
    page,
    setPage,
  };

  return <PageContext.Provider value={pageCtx}>{children}</PageContext.Provider>;
}
