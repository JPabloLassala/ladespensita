import { ReactNode, createContext, useContext, useState } from "react";

export type AppProgressContextType = {
  appState: string;
  setAppState: (appState: string) => void;
};

export const APP_STATE = {
  loading: "loading",
  loaded: "loaded",
  error: "error",
  creating: "creating",
};

export const AppStateContext = createContext<AppProgressContextType | null>(null);

export const AppStateProvider = ({ children }: { children: ReactNode }) => {
  const [appState, setAppState] = useState(APP_STATE.loaded);

  return (
    <AppStateContext.Provider value={{ appState, setAppState }}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppStateContext = (): AppProgressContextType => {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error("useAppStateContext must be used within AppStateProvider");
  return ctx;
};
