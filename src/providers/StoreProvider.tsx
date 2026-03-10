"use client";

import { createContext, useContext } from "react";
import { rootStore, RootStore } from "@/shared/stores/rootStore";

const StoreContext = createContext<RootStore>(rootStore);

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <StoreContext.Provider value={rootStore}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStores = () => useContext(StoreContext);