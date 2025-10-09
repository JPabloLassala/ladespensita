import { ReactNode, createContext, useContext, useState } from "react";
import { Dayjs } from "dayjs";

export type FilterContextType = {
  name: string;
  setName: (name: string) => void;
  nameEnabled: boolean;
  toggleEnableName: () => void;
  sinceDate?: Dayjs | undefined;
  setSinceDate: (sinceDate: Dayjs | undefined) => void;
  sinceDateEnabled: boolean;
  toggleEnableSinceDate: () => void;
  untilDate?: Dayjs | undefined;
  setUntilDate: (untilDate: Dayjs | undefined) => void;
  untilDateEnabled: boolean;
  toggleEnableUntilDate: () => void;
  showUnavailable: boolean;
  toggleShowUnavailable: () => void;
};

export const FilterContext = createContext<FilterContextType | null>(null);

export function FilterContextProvider({ children }: { children: ReactNode }) {
  const [filter, setFilter] = useState({
    name: "",
    nameEnabled: false,
    sinceDate: undefined as Dayjs | undefined,
    sinceDateEnabled: false,
    untilDate: undefined as Dayjs | undefined,
    untilDateEnabled: false,
    showUnavailable: false,
  });

  const setName = (name: string) => {
    setFilter((filter) => ({ ...filter, name }));
  };

  const toggleEnableName = () => {
    setFilter((filter) => ({ ...filter, nameEnabled: !filter.nameEnabled }));
  };

  const setSinceDate = (sinceDate: Dayjs | undefined) => {
    setFilter((filter) => ({ ...filter, sinceDate }));
  };

  const toggleEnableSinceDate = () => {
    setFilter((filter) => ({
      ...filter,
      sinceDateEnabled: !filter.sinceDateEnabled,
    }));
  };

  const setUntilDate = (untilDate: Dayjs | undefined) => {
    setFilter((filter) => ({ ...filter, untilDate }));
  };

  const toggleEnableUntilDate = () => {
    setFilter((filter) => ({
      ...filter,
      untilDateEnabled: !filter.untilDateEnabled,
    }));
  };

  const toggleShowUnavailable = () => {
    setFilter((filter) => ({ ...filter, showUnavailable: !filter.showUnavailable }));
  };

  const {
    name,
    nameEnabled,
    sinceDate,
    sinceDateEnabled,
    untilDate,
    untilDateEnabled,
    showUnavailable,
  } = filter;

  return (
    <FilterContext.Provider
      value={{
        name,
        setName,
        nameEnabled,
        toggleEnableName,
        sinceDate,
        setSinceDate,
        sinceDateEnabled,
        toggleEnableSinceDate,
        untilDate,
        setUntilDate,
        untilDateEnabled,
        toggleEnableUntilDate,
        showUnavailable,
        toggleShowUnavailable,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export const useFilterContext = (): FilterContextType => {
  const ctx = useContext(FilterContext);
  if (!ctx) throw new Error("useFilterContext must be used within FilterContextProvider");
  return ctx;
};
