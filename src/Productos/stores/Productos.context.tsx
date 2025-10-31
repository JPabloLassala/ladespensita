import { createContext, useContext, useState } from "react";
import { ProductoEntity, ProductoEntityCreate, ProductoEntityUpdate } from "../entities";
import { produce } from "immer";

export type ProductosContextType = {
  productos: ProductoEntity[];
  setProductos: React.Dispatch<React.SetStateAction<ProductoEntity[]>>;
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

      oldProductos[index].nombre = productoNewData.nombre;
      oldProductos[index].unidadesMetroLineal = productoNewData.unidadesMetroLineal;
      oldProductos[index].totales = productoNewData.totales;
      oldProductos[index].medidas.altura = productoNewData.altura;
      oldProductos[index].medidas.diametro = productoNewData.diametro;
      oldProductos[index].medidas.ancho = productoNewData.ancho;
      oldProductos[index].medidas.profundidad = productoNewData.profundidad;
      oldProductos[index].valor.unitarioGarantia = productoNewData.valorUnitarioGarantia;
      oldProductos[index].valor.unitarioAlquiler = productoNewData.valorUnitarioAlquiler;
      oldProductos[index].valor.x1 = productoNewData.valorx1;
      oldProductos[index].valor.x3 = productoNewData.valorx3;
      oldProductos[index].valor.x6 = productoNewData.valorx6;
      oldProductos[index].valor.x12 = productoNewData.valorx12;

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

  const createProducto = (newProducto: ProductoEntityCreate) => {
    const producto = new ProductoEntity();
    producto.id = Math.floor(Math.random() * 1000);
    producto.nombre = newProducto.nombre;
    producto.unidadesMetroLineal = newProducto.unidadesMetroLineal;
    producto.totales = newProducto.totales;
    producto.disponibles = newProducto.totales;
    producto.medidas = {
      altura: newProducto.altura,
      diametro: newProducto.diametro,
      ancho: newProducto.ancho,
      profundidad: newProducto.profundidad,
    };
    producto.valor = {
      unitarioGarantia: newProducto.valorUnitarioGarantia,
      unitarioAlquiler: newProducto.valorUnitarioAlquiler,
      x1: newProducto.valorx1,
      x3: newProducto.valorx3,
      x6: newProducto.valorx6,
      x12: newProducto.valorx12,
    };

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
