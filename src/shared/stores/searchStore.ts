import { makeAutoObservable } from "mobx";

export class SearchStore {
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
