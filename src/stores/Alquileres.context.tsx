import { ReactNode, createContext, useState } from "react";
import { initialAlquileres } from "../constants";
import { Alquiler, AlquilerSummaryItem } from "../schemas/Alquiler";
import dayjs from "dayjs";

export type AlquileresContextType = {
  alquileres: Alquiler[];
  setAlquileres: (alquileres: Alquiler[]) => void;
  getSummary: () => AlquilerSummaryItem[];
  getAlquileresBetweenDates: (sinceDate: string, untilDate: string) => Alquiler[];
};

export const AlquileresContext = createContext<AlquileresContextType | null>(null);

export function AlquileresContextProvider({ children }: { children: ReactNode }) {
  const [alquileres, setAlquileres] = useState<Alquiler[]>(initialAlquileres);
  const getSummary = () => {
    return initialAlquileres.map((alquiler) => {
      return {
        id: alquiler.id,
        productora: alquiler.productora,
        proyecto: alquiler.proyecto,
        since: alquiler.since,
        until: alquiler.until,
        totalProductos: alquiler.products.length,
      };
    });
  };
  const getAlquileresBetweenDates = (sinceDate: string, untilDate: string) => {
    if (!sinceDate && !untilDate) {
      return initialAlquileres;
    }

    return initialAlquileres.filter((alquiler) => {
      return (
        dayjs(alquiler.since).isAfter(dayjs(sinceDate)) &&
        dayjs(alquiler.until).isBefore(dayjs(untilDate))
      );
    });
  };

  return (
    <AlquileresContext.Provider
      value={{
        alquileres,
        setAlquileres,
        getSummary,
        getAlquileresBetweenDates,
      }}
    >
      {children}
    </AlquileresContext.Provider>
  );
}
