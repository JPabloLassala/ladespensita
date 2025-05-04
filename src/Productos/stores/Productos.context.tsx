import { createContext, useState } from "react";
import { ProductoEntity, ProductoEntityCreate, ProductoEntityUpdate } from "../entities";

export type ProductosContextType = {
  productos: ProductoEntity[];
  setProductos: React.Dispatch<React.SetStateAction<ProductoEntity[]>>;
  updateProducto: (newProducto: ProductoEntityUpdate) => void;
  createProducto: (newProducto: ProductoEntityCreate) => void;
};

export const ProductosContext = createContext<ProductosContextType | null>(null);

export function ProductosContextProvider({ children }: { children: React.ReactNode }) {
  const [productos, setProductos] = useState<ProductoEntity[]>([]);

  const updateProducto = (newProducto: ProductoEntityUpdate) => {
    const producto = productos.find((p) => p.id === newProducto.id);

    if (!producto) {
      console.error("Producto not found");
      return;
    }

    producto.nombre = newProducto.nombre;
    producto.unidadesMetroLineal = newProducto.unidadesMetroLineal;
    producto.totales = newProducto.totales;
    producto.medidas.altura = newProducto.altura;
    producto.medidas.diametro = newProducto.diametro;
    producto.medidas.ancho = newProducto.ancho;
    producto.medidas.profundidad = newProducto.profundidad;
    producto.valor.unitarioGarantia = newProducto.valorUnitarioGarantia;
    producto.valor.unitarioAlquiler = newProducto.valorUnitarioAlquiler;
    producto.valor.x1 = newProducto.valorx1;
    producto.valor.x3 = newProducto.valorx3;
    producto.valor.x6 = newProducto.valorx6;
    producto.valor.x12 = newProducto.valorx12;
    producto.image = {
      createdAt: new Date(),
      id: Math.floor(Math.random() * 1000),
      isMain: true,
      productoId: newProducto.id,
      url: newProducto.tmpURL || "",
    };

    setProductos((prev) =>
      prev.map((p) => (p.id === newProducto.id ? { ...p, ...producto } : producto)),
    );
  };

  const createProducto = (newProducto: ProductoEntityCreate) => {
    const producto = new ProductoEntity();
    producto.id = Math.floor(Math.random() * 1000);
    producto.nombre = newProducto.nombre;
    producto.unidadesMetroLineal = newProducto.unidadesMetroLineal;
    producto.totales = newProducto.totales;
    producto.disponibles = newProducto.totales;
    producto.medidas.altura = newProducto.altura;
    producto.medidas.diametro = newProducto.diametro;
    producto.medidas.ancho = newProducto.ancho;
    producto.medidas.profundidad = newProducto.profundidad;
    producto.valor.unitarioGarantia = newProducto.valorUnitarioGarantia;
    producto.valor.unitarioAlquiler = newProducto.valorUnitarioAlquiler;
    producto.valor.x1 = newProducto.valorx1;
    producto.valor.x3 = newProducto.valorx3;
    producto.valor.x6 = newProducto.valorx6;
    producto.valor.x12 = newProducto.valorx12;
    producto.image = {
      createdAt: new Date(),
      id: Math.floor(Math.random() * 1000),
      isMain: true,
      productoId: producto.id,
      url: newProducto.tmpURL || "",
    };

    setProductos((prev) => [...prev, { ...producto }]);
  };

  return (
    <ProductosContext.Provider
      value={{
        productos,
        setProductos,
        updateProducto,
        createProducto,
      }}
    >
      {children}
    </ProductosContext.Provider>
  );
}
