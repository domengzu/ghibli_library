import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="flash-timeout"
export default class extends Controller {
  static values = {
    duration: { type: Number }
  }

  connect() {
    this.timeout = setTimeout(() => {
      this.element.remove();
    }, this.durationValue);
  }

  close() {
    this.element.remove()
  }

  disconnect() {
    if (this.timeout) clearTimeout(this.timeout);
  }
}
