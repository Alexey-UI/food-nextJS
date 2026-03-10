import { uiStore } from "./uiStore";
import {searchStore} from "@/shared/stores/searchStore";
import {dropdownStore} from "@/shared/stores/dropdownStore";

export const rootStore = {
  uiStore,
  searchStore,
  dropdownStore,
};

export type RootStore = typeof rootStore;