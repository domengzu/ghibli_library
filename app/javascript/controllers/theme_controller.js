import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="theme"
export default class extends Controller {
  static targets = [ "sun", "moon" ]
  static values = {
    light: {type: String, default: "light"},
    dark: {type: String, default: "dark"},
    storageKey: {type: String, default: "theme"},
    respectSystem: {type: Boolean, default: true}
  }

  connect() {
    console.log("Theme controller connected");
    const save = localStorage.getItem(this.storageKeyValue);
    if (save){
      this.setTheme(save);
      return
    }
    if (this.respectSystemValue && window.matchMedia) {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      this.setTheme(prefersDark ? this.darkValue : this.lightValue, false);
    }
  }

  toggle() {
    const currentTheme = this.currentTheme();
    const newTheme = currentTheme === this.lightValue ? this.darkValue : this.lightValue;
    this.setTheme(newTheme);
  }

  // helpers
  setTheme(theme, save = true) {
    document.documentElement.setAttribute("data-theme", theme);
    
    if (theme === this.darkValue) {
      this.sunTarget.classList.remove("hidden");
      this.moonTarget.classList.add("hidden");
    } else {
      this.sunTarget.classList.add("hidden");
      this.moonTarget.classList.remove("hidden");
    }
    
    if (save) {
      localStorage.setItem(this.storageKeyValue, theme);
    }
  }

  currentTheme() {
    return document.documentElement.getAttribute("data-theme") || this.lightValue;
  }
}
