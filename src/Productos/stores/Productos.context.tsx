import { createContext, useState } from "react";
import { ProductoEntity, ProductoEntityCreate, ProductoEntityUpdate } from "../entities";

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

  const updateProducto = (newProducto: ProductoEntityUpdate) => {
    const productoToUpdate = productos.find((p) => p.id === newProducto.id);

    if (!productoToUpdate) {
      console.error("Producto not found");
      return;
    }

    productoToUpdate.nombre = newProducto.nombre;
    productoToUpdate.unidadesMetroLineal = newProducto.unidadesMetroLineal;
    productoToUpdate.totales = newProducto.totales;
    productoToUpdate.medidas.altura = newProducto.altura;
    productoToUpdate.medidas.diametro = newProducto.diametro;
    productoToUpdate.medidas.ancho = newProducto.ancho;
    productoToUpdate.medidas.profundidad = newProducto.profundidad;
    productoToUpdate.valor.unitarioGarantia = newProducto.valorUnitarioGarantia;
    productoToUpdate.valor.unitarioAlquiler = newProducto.valorUnitarioAlquiler;
    productoToUpdate.valor.x1 = newProducto.valorx1;
    productoToUpdate.valor.x3 = newProducto.valorx3;
    productoToUpdate.valor.x6 = newProducto.valorx6;
    productoToUpdate.valor.x12 = newProducto.valorx12;

    if (newProducto.tmpURL) {
      productoToUpdate.image = {
        createdAt: new Date(),
        id: Math.floor(Math.random() * 1000),
        isMain: true,
        productoId: newProducto.id,
        url: newProducto.tmpURL || "",
      };
    }

    setProductos((prev) =>
      prev.map((p) => {
        if (p.id === productoToUpdate.id) {
          console.log("Updating producto", p.id);
          console.log("New producto ID", newProducto.id);
        }
        return p.id === productoToUpdate.id ? { ...p, ...productoToUpdate } : p;
      }),
    );
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
