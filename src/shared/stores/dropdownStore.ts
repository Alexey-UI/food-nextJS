import { makeAutoObservable } from "mobx";

export class DropdownStore {
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
