import { createContext, useContext, useState } from "react";
import { ProductoEntity, ProductoEntityCreate, ProductoEntityUpdate } from "../entities";
import { FileWithPath } from "@mantine/dropzone";

export type ProductosContextType = {
  productos: ProductoEntity[];
  setProductos: React.Dispatch<React.SetStateAction<ProductoEntity[]>>;
  getUpdateProductoFormData: (producto: ProductoEntityUpdate | ProductoEntityCreate) => FormData;
  updateProducto: (productoId: number, newProducto: ProductoEntityUpdate) => void;
  createProducto: (newProducto: ProductoEntity) => void;
  deleteProducto: (id: number) => void;
};

export const ProductosContext = createContext<ProductosContextType | null>(null);

export function ProductosContextProvider({ children }: { children: React.ReactNode }) {
  const [productos, setProductos] = useState<ProductoEntity[]>([]);

  const updateProducto = (productoId: number, productoNewData: ProductoEntityUpdate) => {
    setProductos((oldProductos) => {
      return oldProductos.map((producto) => {
        if (producto.id === productoId) {
          return { ...producto, ...productoNewData };
        }
        return producto;
      });
    });
  };

  const getUpdateProductoFormData = (producto: ProductoEntityUpdate | ProductoEntityCreate) => {
    const formData = new FormData();

    const { file, ...body } = producto;
    if (file) formData.append("file", file as FileWithPath);
    formData.append("body", JSON.stringify(body));

    return formData;
  };

  const createProducto = (newProducto: ProductoEntity) => {
    setProductos((prev) => [newProducto, ...prev]);
  };

  const deleteProducto = (id: number) => {
    setProductos((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <ProductosContext.Provider
      value={{
        productos,
        setProductos,
        updateProducto,
        createProducto,
        deleteProducto,
        getUpdateProductoFormData,
      }}
    >
      {children}
    </ProductosContext.Provider>
  );
}

export function useProductosContext(): ProductosContextType {
  const ctx = useContext(ProductosContext);
  if (!ctx) throw new Error("useProductosContext must be used within ProductosContextProvider");
  return ctx;
}
