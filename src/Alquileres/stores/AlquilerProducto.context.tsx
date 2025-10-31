import { ReactNode, createContext, useContext, useState } from "react";
import {
  AlquilerProductoCreate,
  AlquilerProductoEntity,
  AlquilerProductoRemaining,
  AlquilerProductoUpdate,
} from "../entities";
import { ProductoEntity } from "@/Productos";

export type AlquilerProductoContextType = {
  alquilerProductos: (AlquilerProductoEntity | AlquilerProductoCreate | AlquilerProductoUpdate)[];
  setAlquilerProductos: React.Dispatch<
    React.SetStateAction<
      (AlquilerProductoEntity | AlquilerProductoCreate | AlquilerProductoUpdate)[]
    >
  >;
  alquilerProductoRemaining: AlquilerProductoRemaining[];
  setAlquilerProductoRemaining: React.Dispatch<React.SetStateAction<AlquilerProductoRemaining[]>>;
  createEmptyAlquilerProducto: (
    producto: ProductoEntity,
    alquilerId?: number,
  ) => AlquilerProductoCreate;
};

export const AlquilerProductoContext = createContext<AlquilerProductoContextType | null>(null);

export function AlquilerProductoContextProvider({ children }: { children: ReactNode }) {
  const [alquilerProductos, setAlquilerProductos] = useState<
    (AlquilerProductoEntity | AlquilerProductoCreate | AlquilerProductoUpdate)[]
  >([]);
  const [alquilerProductoRemaining, setAlquilerProductoRemaining] = useState<
    AlquilerProductoRemaining[]
  >([]);

  const createEmptyAlquilerProducto = (
    producto: ProductoEntity,
    alquilerId?: number,
  ): AlquilerProductoCreate => {
    return {
      productoId: producto.id,
      alquilerId: alquilerId || undefined,
      cantidad: alquilerProductos.find((p) => p.productoId === producto.id)?.cantidad || 0,
      valorTotalGarantia: 0,
      costoDiseno: producto.costoDiseno,
      costoGrafica: producto.costoGrafica,
      costoTotal: producto.costoTotal,
      valorUnitarioGarantia: producto.valorUnitarioGarantia,
      valorX1: producto.valorX1,
      valorX3: producto.valorX3,
      valorX6: producto.valorX6,
      valorX12: producto.valorX12,
    };
  };

  return (
    <AlquilerProductoContext.Provider
      value={{
        alquilerProductos,
        setAlquilerProductos,
        alquilerProductoRemaining,
        setAlquilerProductoRemaining,
        createEmptyAlquilerProducto,
      }}
    >
      {children}
    </AlquilerProductoContext.Provider>
  );
}

export const useAlquilerProductoContext = (): AlquilerProductoContextType => {
  const ctx = useContext(AlquilerProductoContext);
  if (!ctx)
    throw new Error(
      "useAlquilerProductoContext must be used within AlquilerProductoContextProvider",
    );
  return ctx;
};
