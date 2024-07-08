import { createContext, useState } from "react";
import { ProductoType } from "../schemas";

export type ProductsContextType = {
  productos: ProductoType[];
  setProductos: React.Dispatch<React.SetStateAction<ProductoType[]>>;
};

export const ProductsContext = createContext<ProductsContextType | null>(null);

export function ProductsContextProvider({ children }: { children: React.ReactNode }) {
  const [productos, setProductos] = useState<ProductoType[]>([]);

  return (
    <ProductsContext.Provider
      value={{
        productos,
        setProductos,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}
