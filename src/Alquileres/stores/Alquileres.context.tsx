import { ReactNode, createContext, useContext, useState } from "react";

import dayjs from "dayjs";
import {
  Alquiler,
  AlquilerProductoEntity,
  AlquilerSummaryItem,
  PartialAlquiler,
} from "../entities";
import { ProductoEntity } from "@/Productos";

export type AlquileresContextType = {
  getSummary: () => AlquilerSummaryItem[];
  alquileres: Alquiler[];
  setAlquileres: React.Dispatch<React.SetStateAction<Alquiler[]>>;
  selectedAlquiler: PartialAlquiler | undefined;
  alquilerProductos: AlquilerProductoEntity[];
  setSelectedAlquiler: React.Dispatch<React.SetStateAction<Alquiler | undefined>>;
  setAlquilerProductos: React.Dispatch<React.SetStateAction<AlquilerProductoEntity[]>>;
  deleteAlquiler: (id: number) => void;
  updateAlquiler: (alquilerId: number, updatedAlquiler: Partial<Alquiler>) => void;
  createNewAlquiler: () => Alquiler;
  deleteNewAlquiler: () => void;
  getAlquileresBetweenDates: (sinceDate: string, untilDate: string) => Alquiler[];
  createEmptyAlquilerProducto: (
    alquilerId: number,
    producto: ProductoEntity,
  ) => AlquilerProductoEntity;
};

export const AlquileresContext = createContext<AlquileresContextType | null>(null);

export function AlquileresContextProvider({ children }: { children: ReactNode }) {
  const [alquileres, setAlquileres] = useState<Alquiler[]>([]);
  const [, setNewAlquilerIdx] = useState<number>(-1);
  const [alquilerProductos, setAlquilerProductos] = useState<AlquilerProductoEntity[]>([]);
  const [selectedAlquiler, setSelectedAlquiler] = useState<Alquiler | undefined>(undefined);

  const getSummary = (): AlquilerSummaryItem[] => {
    return alquileres.map((alquiler) => {
      return {
        id: alquiler.id,
        productora: alquiler.productora,
        proyecto: alquiler.proyecto,
        since: alquiler.fechaAlquiler?.inicio?.toString(),
        until: alquiler.fechaAlquiler?.fin?.toString(),
        totalProductos: 0,
      };
    });
  };

  const updateAlquiler = (alquilerId: number, updatedAlquiler: Partial<Alquiler>) => {
    setAlquileres((prev) =>
      prev.map((alquiler) =>
        alquiler.id === alquilerId ? { ...alquiler, ...updatedAlquiler } : alquiler,
      ),
    );
  };

  const getAlquileresBetweenDates = (sinceDate: string, untilDate: string) => {
    if (!sinceDate && !untilDate) {
      return [];
    }

    if (sinceDate && untilDate) {
      return alquileres.filter((alquiler) => {
        return (
          dayjs(alquiler.fechaAlquiler.inicio).isAfter(dayjs(sinceDate)) &&
          dayjs(alquiler.fechaAlquiler.fin).isBefore(dayjs(untilDate))
        );
      });
    }

    if (sinceDate) {
      return alquileres.filter((alquiler) => {
        return dayjs(alquiler.fechaAlquiler.inicio).isAfter(dayjs(sinceDate));
      });
    }

    // untilDate
    return alquileres.filter((alquiler) => {
      return dayjs(alquiler.fechaAlquiler.fin).isBefore(dayjs(untilDate));
    });
  };

  const deleteAlquiler = (id: number) => {
    setAlquileres((prev) => prev.filter((alquiler) => alquiler.id !== id));
  };

  const createNewAlquiler = (): Alquiler => {
    const newAlquiler = {
      id: -1,
      productora: "",
      proyecto: "",
      productos: [],
      fechaPresupuesto: new Date(),
      fechaAlquiler: {
        inicio: new Date(),
        fin: new Date(),
      },
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
  ): AlquilerProductoEntity => {
    const { unitarioGarantia, x1, x3, x6, x12 } = producto.valor;
    return {
      id: 0,
      productoId: producto.id,
      alquilerId,
      cantidad: alquilerProductos.find((p) => p.productoId === producto.id)?.cantidad || 0,
      unidadesAlquiladas: 0,
      unidadesCotizadas: 0,
      valor: {
        totalGarantia: unitarioGarantia,
        unitarioAlquiler: 0,
        unitarioGarantia,
        x1,
        x3,
        x6,
        x12,
      },
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
        getAlquileresBetweenDates,
        alquilerProductos,
        setAlquilerProductos,
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
