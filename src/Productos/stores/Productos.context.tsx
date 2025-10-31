import { createContext, useContext, useState } from "react";
import { ProductoEntity, ProductoEntityCreate, ProductoEntityUpdate } from "../entities";
import { produce } from "immer";
import { FileWithPath } from "@mantine/dropzone";

export type ProductosContextType = {
  productos: ProductoEntity[];
  setProductos: React.Dispatch<React.SetStateAction<ProductoEntity[]>>;
  getUpdateProductoFormData: (producto: ProductoEntityUpdate | ProductoEntityCreate) => FormData;
  updateProducto: (newProducto: ProductoEntityUpdate) => void;
  createProducto: (newProducto: ProductoEntityCreate) => void;
  deleteProducto: (id: number) => void;
};

export const ProductosContext = createContext<ProductosContextType | null>(null);

export function ProductosContextProvider({ children }: { children: React.ReactNode }) {
  const [productos, setProductos] = useState<ProductoEntity[]>([]);

  const updateProducto = (productoNewData: ProductoEntityUpdate) => {
    const newProductosArray = produce(productos, (oldProductos) => {
      const index = oldProductos.findIndex((p) => p.id === productoNewData.id);
      if (index === -1) return;

      if (productoNewData.nombre) oldProductos[index].nombre = productoNewData.nombre;
      if (productoNewData.unidadesMetroLineal)
        oldProductos[index].unidadesMetroLineal = productoNewData.unidadesMetroLineal;
      if (productoNewData.totales) oldProductos[index].totales = productoNewData.totales;
      if (productoNewData.medidasAltura)
        oldProductos[index].medidasAltura = productoNewData.medidasAltura;
      if (productoNewData.medidasDiametro)
        oldProductos[index].medidasDiametro = productoNewData.medidasDiametro;
      if (productoNewData.medidasAncho)
        oldProductos[index].medidasAncho = productoNewData.medidasAncho;
      if (productoNewData.medidasProfundidad)
        oldProductos[index].medidasProfundidad = productoNewData.medidasProfundidad;
      if (productoNewData.valorUnitarioGarantia)
        oldProductos[index].valorUnitarioGarantia = productoNewData.valorUnitarioGarantia;
      if (productoNewData.valorUnitarioAlquiler)
        oldProductos[index].valorUnitarioAlquiler = productoNewData.valorUnitarioAlquiler;
      if (productoNewData.valorX1) oldProductos[index].valorX1 = productoNewData.valorX1;
      if (productoNewData.valorX3) oldProductos[index].valorX3 = productoNewData.valorX3;
      if (productoNewData.valorX6) oldProductos[index].valorX6 = productoNewData.valorX6;
      if (productoNewData.valorX12) oldProductos[index].valorX12 = productoNewData.valorX12;

      if (productoNewData.tmpURL) {
        oldProductos[index].image = {
          createdAt: new Date(),
          id: Math.floor(Math.random() * 1000),
          isMain: true,
          productoId: productoNewData.id,
          url: productoNewData.tmpURL || "",
        };
      }
    });

    setProductos(newProductosArray);
  };

  const getUpdateProductoFormData = (producto: ProductoEntityUpdate | ProductoEntityCreate) => {
    const formData = new FormData();

    if (producto.file) formData.append("file", producto.file as FileWithPath);
    if (producto.nombre) formData.append("nombre", producto.nombre as string);
    if (producto.unidadesMetroLineal)
      formData.append("unidadesMetroLineal", producto.unidadesMetroLineal?.toString());
    if (producto.totales) formData.append("totales", producto.totales?.toString() as string);
    if (producto.medidasAltura) formData.append("altura", producto.medidasAltura?.toString() || "");
    if (producto.medidasDiametro)
      formData.append("diametro", producto.medidasDiametro?.toString() || "");
    if (producto.medidasAncho) formData.append("ancho", producto.medidasAncho?.toString() || "");
    if (producto.medidasProfundidad)
      formData.append("profundidad", producto.medidasProfundidad?.toString() || "");
    if (producto.valorUnitarioGarantia)
      formData.append("valorUnitarioGarantia", producto.valorUnitarioGarantia?.toString() || "");
    if (producto.valorUnitarioAlquiler)
      formData.append("valorUnitarioAlquiler", producto.valorUnitarioAlquiler.toString());
    if (producto.valorX1) formData.append("valorX1", producto.valorX1.toString());
    if (producto.valorX3) formData.append("valorX3", producto.valorX3.toString());
    if (producto.valorX6) formData.append("valorX6", producto.valorX6.toString());
    if (producto.valorX12) formData.append("valorX12", producto.valorX12.toString());

    return formData;
  };

  const createProducto = (newProducto: ProductoEntityCreate) => {
    const producto = new ProductoEntity();
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
