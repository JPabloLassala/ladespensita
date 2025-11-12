import { createContext, useContext, useState } from "react";
import { ProductoEntity, ProductoEntityCreate, ProductoEntityUpdate } from "../entities";
import { FileWithPath } from "@mantine/dropzone";

export type ProductosContextType = {
  productos: ProductoEntity[];
  setProductos: React.Dispatch<React.SetStateAction<ProductoEntity[]>>;
  getUpdateProductoFormData: (producto: ProductoEntityUpdate | ProductoEntityCreate) => FormData;
  updateProducto: (productoId: number, newProducto: ProductoEntityUpdate) => void;
  createProducto: (newProducto: ProductoEntityCreate) => void;
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

  const createProducto = (newProducto: ProductoEntityCreate) => {
    const producto: ProductoEntity = new ProductoEntity();
    producto.id = Math.floor(Math.random() * 1000);
    producto.nombre = newProducto.nombre;
    producto.unidadesMetroLineal = newProducto.unidadesMetroLineal;
    producto.totales = newProducto.totales;
    producto.totales = newProducto.totales;
    producto.medidasAltura = newProducto.medidasAltura;
    producto.medidasDiametro = newProducto.medidasDiametro;
    producto.medidasAncho = newProducto.medidasAncho;
    producto.medidasProfundidad = newProducto.medidasProfundidad;
    producto.valorUnitarioGarantia = newProducto.valorUnitarioGarantia;
    producto.valorUnitarioAlquiler = newProducto.valorUnitarioAlquiler;
    producto.valorX1 = newProducto.valorX1;
    producto.valorX3 = newProducto.valorX3;
    producto.valorX6 = newProducto.valorX6;
    producto.valorX12 = newProducto.valorX12;

    producto.image = {
      createdAt: new Date(),
      id: Math.floor(Math.random() * 1000),
      isMain: true,
      productoId: producto.id,
      url: newProducto.tmpURL || "",
    };

    setProductos((prev) => [...prev, { ...producto }]);
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
