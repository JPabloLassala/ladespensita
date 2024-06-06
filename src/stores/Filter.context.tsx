import { Dispatch, ReactNode, SetStateAction, createContext, useState } from "react";
import { Dayjs } from "dayjs";

export type FilterContextType = {
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  sinceDate?: Dayjs;
  untilDate?: Dayjs;
  showUnavailable: boolean;
  setSinceDate: Dispatch<SetStateAction<Dayjs | undefined>>;
  setUntilDate: Dispatch<SetStateAction<Dayjs | undefined>>;
  setShowUnavailable: Dispatch<SetStateAction<boolean>>;
};

export const FilterContext = createContext<FilterContextType | null>(null);

export function FilterContextProvider({ children }: { children: ReactNode }) {
  const [name, setName] = useState("");
  const [sinceDate, setSinceDate] = useState<Dayjs | undefined>(undefined);
  const [untilDate, setUntilDate] = useState<Dayjs | undefined>(undefined);
  const [showUnavailable, setShowUnavailable] = useState(false);

  return (
    <FilterContext.Provider
      value={{
        name,
        setName,
        sinceDate,
        untilDate,
        setSinceDate,
        setUntilDate,
        showUnavailable,
        setShowUnavailable,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}
