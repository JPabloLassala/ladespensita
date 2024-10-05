import { createContext, useState } from "react";
import { ProductoEntity } from "../entities";

export type ProductosContextType = {
  productos: ProductoEntity[];
  setProductos: React.Dispatch<React.SetStateAction<ProductoEntity[]>>;
};

export const ProductosContext = createContext<ProductosContextType | null>(null);

export function ProductosContextProvider({ children }: { children: React.ReactNode }) {
  const [productos, setProductos] = useState<ProductoEntity[]>([]);

  return (
    <ProductosContext.Provider
      value={{
        productos,
        setProductos,
      }}
    >
      {children}
    </ProductosContext.Provider>
  );
}
