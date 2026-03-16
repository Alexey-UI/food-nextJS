import { makeAutoObservable } from "mobx";

export class uiStore {
  mobileMenuOpen = false;

  constructor() {
    makeAutoObservable(this);
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu() {
    this.mobileMenuOpen = false;
  }
}
