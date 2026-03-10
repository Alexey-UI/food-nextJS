import { makeAutoObservable } from "mobx";

class UIStore {
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

export const uiStore = new UIStore();