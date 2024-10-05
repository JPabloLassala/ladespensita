import { ReactNode, createContext, useState } from "react";

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

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [appState, setAppState] = useState(APP_STATE.loaded);

  return (
    <AppStateContext.Provider value={{ appState, setAppState }}>
      {children}
    </AppStateContext.Provider>
  );
}
