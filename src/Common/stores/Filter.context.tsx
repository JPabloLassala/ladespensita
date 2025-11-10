import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { Dayjs } from "dayjs";
import { ProductoEntity } from "@/Productos";

export type Filter = {
  name: string;
  nameEnabled: boolean;
  sinceDate: Dayjs | undefined;
  sinceDateEnabled: boolean;
  untilDate: Dayjs | undefined;
  untilDateEnabled: boolean;
  showUnavailable: boolean;
};

export type FilterContextType = {
  filter: Filter;
  setFilter: React.Dispatch<React.SetStateAction<Filter>>;
  filteredProductos: ProductoEntity[];
  setFilteredProductos: React.Dispatch<React.SetStateAction<ProductoEntity[]>>;
};

export const FilterContext = createContext<FilterContextType | null>(null);

export function FilterContextProvider({ children }: { children: ReactNode }) {
  const [filteredProductos, setFilteredProductos] = useState<ProductoEntity[]>([]);
  const [filter, setFilter] = useState<Filter>({
    name: "",
    nameEnabled: false,
    sinceDate: undefined as Dayjs | undefined,
    sinceDateEnabled: false,
    untilDate: undefined as Dayjs | undefined,
    untilDateEnabled: false,
    showUnavailable: false,
  });

  return (
    <FilterContext.Provider value={{ filter, setFilter, setFilteredProductos, filteredProductos }}>
      {children}
    </FilterContext.Provider>
  );
}

export const useFilterContext = (): FilterContextType => {
  const ctx = useContext(FilterContext);
  if (!ctx) throw new Error("useFilterContext must be used within FilterContextProvider");
  return ctx;
};
