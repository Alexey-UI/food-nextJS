import { makeAutoObservable } from "mobx";

class SearchStore {
  value = "";

  constructor() {
    makeAutoObservable(this);
  }

  setValue(value: string) {
    this.value = value;
  }

  clear() {
    this.value = "";
  }
}

export const searchStore = new SearchStore();