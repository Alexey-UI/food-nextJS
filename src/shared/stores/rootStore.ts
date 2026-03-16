import { WinePairingStore } from "./winePairingStore";
import { SearchStore } from "./searchStore";
import { DropdownStore } from "./dropdownStore";
import { uiStore } from "./uiStore";

export class RootStore {
  uiStore: uiStore;
  searchStore: SearchStore;
  dropdownStore: DropdownStore;
  winePairingStore: WinePairingStore;

  constructor() {
    this.uiStore = new uiStore();
    this.searchStore = new SearchStore();
    this.dropdownStore = new DropdownStore();
    this.winePairingStore = new WinePairingStore();
  }
}