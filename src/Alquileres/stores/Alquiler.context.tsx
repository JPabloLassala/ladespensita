import { ReactNode, createContext, useContext, useState } from "react";

import dayjs from "dayjs";
import {
  AlquilerCreate,
  AlquilerEntity,
  AlquilerProductoCreate,
  AlquilerProductoEntity,
  AlquilerProductoRemaining,
  AlquilerSummaryItem,
} from "../entities";
import { ProductoEntity } from "@/Productos";

export type AlquilerContextType = {
  getSummary: () => AlquilerSummaryItem[];
  alquileres: AlquilerEntity[];
  setAlquileres: React.Dispatch<React.SetStateAction<AlquilerEntity[]>>;
  selectedAlquiler: AlquilerEntity | undefined;
  setSelectedAlquiler: React.Dispatch<React.SetStateAction<AlquilerEntity | undefined>>;
  alquilerProductos: AlquilerProductoEntity[];
  setAlquilerProductos: React.Dispatch<React.SetStateAction<AlquilerProductoEntity[]>>;
  alquilerProductoRemaining: AlquilerProductoRemaining[];
  setAlquilerProductoRemaining: React.Dispatch<React.SetStateAction<AlquilerProductoRemaining[]>>;
  deleteAlquiler: (id: number) => void;
  updateAlquiler: (alquilerId: number, updatedAlquiler: Partial<AlquilerEntity>) => void;
  createAlquiler: (alquiler: AlquilerEntity) => void;
  newAlquiler: AlquilerCreate | undefined;
  setNewAlquiler: React.Dispatch<React.SetStateAction<AlquilerCreate | undefined>>;
  createEmptyAlquiler: () => AlquilerCreate;
  createEmptyAlquilerProducto: (
    producto: ProductoEntity,
    alquilerId?: number,
  ) => AlquilerProductoCreate;
};

export const AlquilerContext = createContext<AlquilerContextType | null>(null);

export function AlquilerContextProvider({ children }: { children: ReactNode }) {
  const [alquileres, setAlquileres] = useState<AlquilerEntity[]>([]);
  const [alquilerProductos, setAlquilerProductos] = useState<AlquilerProductoEntity[]>([]);
  const [selectedAlquiler, setSelectedAlquiler] = useState<AlquilerEntity | undefined>(undefined);
  const [alquilerProductoRemaining, setAlquilerProductoRemaining] = useState<
    AlquilerProductoRemaining[]
  >([]);
  const [newAlquiler, setNewAlquiler] = useState<AlquilerCreate | undefined>(undefined);

  const getSummary = (): AlquilerSummaryItem[] => {
    return alquileres.map((alquiler) => {
      return {
        id: alquiler.id,
        productora: alquiler.productora,
        proyecto: alquiler.proyecto,
        fechaInicio: alquiler.fechaInicio?.toString(),
        fechaFin: alquiler.fechaFin?.toString(),
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

  const createAlquiler = (alquiler: AlquilerEntity) => {
    setAlquileres((prev) => [alquiler, ...prev]);
  };

  const createEmptyAlquiler = (): AlquilerCreate => {
    const newAlquiler = {
      proyecto: "Nuevo proyecto",
      productora: "Nueva productora",
      fechaInicio: dayjs().toDate(),
      fechaFin: dayjs().add(7, "day").toDate(),
      fechaPresupuesto: dayjs().toDate(),
      productos: [],
    };

    setNewAlquiler(newAlquiler);
    return newAlquiler;
  };

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
    <AlquilerContext.Provider
      value={{
        alquileres,
        getSummary,
        setAlquileres,
        deleteAlquiler,
        updateAlquiler,
        newAlquiler,
        setNewAlquiler,
        createEmptyAlquiler,
        createAlquiler,
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
    </AlquilerContext.Provider>
  );
}

export const useAlquilerContext = (): AlquilerContextType => {
  const ctx = useContext(AlquilerContext);
  if (!ctx) throw new Error("useAlquilerContext must be used within AlquilerContextProvider");
  return ctx;
};
