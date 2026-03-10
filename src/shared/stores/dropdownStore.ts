import { makeAutoObservable } from "mobx";

class DropdownStore {
  categoryOpen = false;

  constructor() {
    makeAutoObservable(this);
  }

  toggleCategory = () => {
    this.categoryOpen = !this.categoryOpen;
  };

  closeCategory = () => {
    this.categoryOpen = false;
  };
}

export const dropdownStore = new DropdownStore();