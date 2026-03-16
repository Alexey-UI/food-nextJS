"use client";

import React, { createContext, useContext, useState } from "react";
import { RootStore } from "@/shared/stores/rootStore";

const StoreContext = createContext<RootStore | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [store] = useState(() => new RootStore());

  return (
    <StoreContext.Provider value={store}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStores() {
  const store = useContext(StoreContext);

  if (!store) {
    throw new Error("StoreProvider is missing");
  }

  return store;
}