import { ReactNode, createContext, useContext, useState } from "react";

import dayjs from "dayjs";
import {
  AlquilerEntity,
  AlquilerProductoCreate,
  AlquilerProductoEntity,
  AlquilerProductoRemaining,
  AlquilerSummaryItem,
  AlquilerUpdate,
} from "../entities";
import { ProductoEntity } from "@/Productos";

export type AlquileresContextType = {
  getSummary: () => AlquilerSummaryItem[];
  alquileres: AlquilerEntity[];
  setAlquileres: React.Dispatch<React.SetStateAction<AlquilerEntity[]>>;
  selectedAlquiler: AlquilerUpdate | undefined;
  setSelectedAlquiler: React.Dispatch<React.SetStateAction<AlquilerEntity | undefined>>;
  alquilerProductos: AlquilerProductoEntity[];
  setAlquilerProductos: React.Dispatch<React.SetStateAction<AlquilerProductoEntity[]>>;
  alquilerProductoRemaining: AlquilerProductoRemaining[];
  setAlquilerProductoRemaining: React.Dispatch<React.SetStateAction<AlquilerProductoRemaining[]>>;
  deleteAlquiler: (id: number) => void;
  updateAlquiler: (alquilerId: number, updatedAlquiler: Partial<AlquilerEntity>) => void;
  createNewAlquiler: () => AlquilerEntity;
  deleteNewAlquiler: () => void;
  createEmptyAlquilerProducto: (
    alquilerId: number,
    producto: ProductoEntity,
  ) => AlquilerProductoCreate;
};

export const AlquileresContext = createContext<AlquileresContextType | null>(null);

export function AlquileresContextProvider({ children }: { children: ReactNode }) {
  const [alquileres, setAlquileres] = useState<AlquilerEntity[]>([]);
  const [, setNewAlquilerIdx] = useState<number>(-1);
  const [alquilerProductos, setAlquilerProductos] = useState<AlquilerProductoEntity[]>([]);
  const [selectedAlquiler, setSelectedAlquiler] = useState<AlquilerEntity | undefined>(undefined);
  const [alquilerProductoRemaining, setAlquilerProductoRemaining] = useState<
    AlquilerProductoRemaining[]
  >([]);

  const getSummary = (): AlquilerSummaryItem[] => {
    return alquileres.map((alquiler) => {
      return {
        id: alquiler.id,
        productora: alquiler.productora,
        proyecto: alquiler.proyecto,
        since: alquiler.fechaInicio?.toString(),
        until: alquiler.fechaFin?.toString(),
        totalProductos: 0,
      };
    });
  };

  const updateAlquiler = (alquilerId: number, updatedAlquiler: Partial<AlquilerEntity>) => {
    setAlquileres((prev) =>
      prev.map((alquiler) =>
        alquiler.id === alquilerId ? { ...alquiler, ...updatedAlquiler } : alquiler,
      ),
    );
  };

  const deleteAlquiler = (id: number) => {
    setAlquileres((prev) => prev.filter((alquiler) => alquiler.id !== id));
  };

  const createNewAlquiler = (): AlquilerEntity => {
    const newAlquiler: AlquilerEntity = {
      id: -1,
      productora: "",
      proyecto: "",
      productos: [],
      fechaPresupuesto: new Date(),
      fechaInicio: new Date(),
      fechaFin: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setAlquileres((prev) => [newAlquiler, ...prev]);
    setNewAlquilerIdx(0);
    return newAlquiler;
  };

  const deleteNewAlquiler = (): void => {
    setAlquileres((prev) => prev.filter((a) => a.id !== -1));
    setNewAlquilerIdx(-1);
  };

  const createEmptyAlquilerProducto = (
    alquilerId: number,
    producto: ProductoEntity,
  ): AlquilerProductoCreate => {
    return {
      productoId: producto.id,
      alquilerId,
      cantidad: alquilerProductos.find((p) => p.productoId === producto.id)?.cantidad || 0,
      unidadesAlquiladas: 0,
      unidadesCotizadas: 0,
      valorTotalGarantia: 0,
      costoDiseno: producto.costoDiseno,
      costoGrafica: producto.costoGrafica,
      costoProducto: producto.costoProducto,
      costoTotal: producto.costoTotal,
      valorUnitarioAlquiler: producto.valorUnitarioAlquiler,
      valorUnitarioGarantia: producto.valorUnitarioGarantia,
      valorX1: producto.valorX1,
      valorX3: producto.valorX3,
      valorX6: producto.valorX6,
      valorX12: producto.valorX12,
    };
  };

  return (
    <AlquileresContext.Provider
      value={{
        alquileres,
        getSummary,
        setAlquileres,
        deleteAlquiler,
        updateAlquiler,
        createNewAlquiler,
        deleteNewAlquiler,
        selectedAlquiler,
        setSelectedAlquiler,
        alquilerProductos,
        setAlquilerProductos,
        alquilerProductoRemaining,
        setAlquilerProductoRemaining,
        createEmptyAlquilerProducto,
      }}
    >
      {children}
    </AlquileresContext.Provider>
  );
}

export const useAlquileresContext = (): AlquileresContextType => {
  const ctx = useContext(AlquileresContext);
  if (!ctx) throw new Error("useAlquileresContext must be used within AlquileresContextProvider");
  return ctx;
};
