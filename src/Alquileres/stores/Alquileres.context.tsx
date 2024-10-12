import { ReactNode, createContext, useState } from "react";

import dayjs from "dayjs";
import { Alquiler, AlquilerSummaryItem, PartialAlquiler } from "../entities";

export type AlquileresContextType = {
  alquileres: Alquiler[];
  newAlquiler: PartialAlquiler;
  setAlquileres: React.Dispatch<React.SetStateAction<Alquiler[]>>;
  setNewAlquiler: React.Dispatch<React.SetStateAction<PartialAlquiler>>;
  deleteAlquiler: (id: number) => void;
  getSummary: () => AlquilerSummaryItem[];
  getAlquileresBetweenDates: (sinceDate: string, untilDate: string) => Alquiler[];
  increaseAlquilerProducto: (idAlquiler: number, productoId: number) => void;
};

export const AlquileresContext = createContext<AlquileresContextType | null>(null);

export function AlquileresContextProvider({ children }: { children: ReactNode }) {
  const [alquileres, setAlquileres] = useState<Alquiler[]>([]);
  const [newAlquiler, setNewAlquiler] = useState<PartialAlquiler>({});

  const getSummary = (): AlquilerSummaryItem[] => {
    return alquileres.map((alquiler) => {
      return {
        id: alquiler.id,
        productora: alquiler.productora,
        proyecto: alquiler.proyecto,
        since: alquiler.fechaAlquiler.inicio.toString(),
        until: alquiler.fechaAlquiler.fin.toString(),
        totalProductos: alquiler.productos.length,
      };
    });
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
    setAlquileres(alquileres.filter((alquiler) => alquiler.id !== id));
  };

  const increaseAlquilerProducto = (idAlquiler: number, productoId: number) => {
    const alquiler = alquileres.find((a) => a.id === idAlquiler);
    if (!alquiler) {
      return;
    }

    const producto = alquiler.productos.find((p) => p.producto.id === productoId);
    if (!producto) {
      return;
    }

    producto.cantidad += 1;
  };

  return (
    <AlquileresContext.Provider
      value={{
        alquileres,
        getSummary,
        newAlquiler,
        setAlquileres,
        deleteAlquiler,
        setNewAlquiler,
        increaseAlquilerProducto,
        getAlquileresBetweenDates,
      }}
    >
      {children}
    </AlquileresContext.Provider>
  );
}
