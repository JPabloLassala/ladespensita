import { ReactNode, createContext, useState } from "react";

import dayjs from "dayjs";
import {
  Alquiler,
  AlquilerProductoEntity,
  AlquilerSummaryItem,
  PartialAlquiler,
} from "../entities";

export type AlquileresContextType = {
  alquileres: Alquiler[];
  newAlquiler: PartialAlquiler;
  setAlquileres: React.Dispatch<React.SetStateAction<Alquiler[]>>;
  setNewAlquiler: React.Dispatch<React.SetStateAction<PartialAlquiler>>;
  deleteAlquiler: (id: number) => void;
  getSummary: () => AlquilerSummaryItem[];
  getAlquileresBetweenDates: (sinceDate: string, untilDate: string) => Alquiler[];
  increaseAlquilerProducto: (idAlquiler: number, productoId: number) => void;
  decreaseAlquilerProducto: (idAlquiler: number, productoId: number) => void;
  alquilerProductos: AlquilerProductoEntity[];
  selectedAlquiler: Alquiler | undefined;
  setSelectedAlquiler: React.Dispatch<React.SetStateAction<Alquiler | undefined>>;
  setAlquilerProductos: React.Dispatch<React.SetStateAction<AlquilerProductoEntity[]>>;
};

export const AlquileresContext = createContext<AlquileresContextType | null>(null);

export function AlquileresContextProvider({ children }: { children: ReactNode }) {
  const [alquileres, setAlquileres] = useState<Alquiler[]>([]);
  const [newAlquiler, setNewAlquiler] = useState<PartialAlquiler>({});
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

    const producto = alquiler.productos.find((p) => p.productoId === productoId);
    if (!producto) {
      return;
    }

    producto.cantidad += 1;
  };

  const decreaseAlquilerProducto = (idAlquiler: number, productoId: number) => {
    const alquiler = alquileres.find((a) => a.id === idAlquiler);
    if (!alquiler) {
      return;
    }

    const producto = alquiler.productos.find((p) => p.productoId === productoId);
    if (!producto) {
      return;
    }

    producto.cantidad -= 1;
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
        selectedAlquiler,
        setSelectedAlquiler,
        increaseAlquilerProducto,
        decreaseAlquilerProducto,
        getAlquileresBetweenDates,
        alquilerProductos,
        setAlquilerProductos,
      }}
    >
      {children}
    </AlquileresContext.Provider>
  );
}
