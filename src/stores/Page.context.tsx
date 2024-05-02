import { ReactNode, createContext, useState } from "react";

export type PageContextType = {
  page: string;
  setPage: (page: string) => void;
};

export const PAGES = {
  productos: "/productos",
  alquileres: "/alquileres",
};

export const PageContext = createContext<PageContextType | null>(null);

export function PageContextProvider({ children }: { children: ReactNode }) {
  const [page, setPage] = useState(PAGES.productos);

  return <PageContext.Provider value={{ page, setPage }}>{children}</PageContext.Provider>;
}
