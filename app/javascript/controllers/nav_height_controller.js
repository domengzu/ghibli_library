import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["nav"]

  connect() {
    if (!this.hasNavTarget) return

    this.lastY = window.scrollY
    this.ticking = false
    this.threshold = 8

    this.onScroll = this.onScroll.bind(this)
    window.addEventListener("scroll", this.onScroll, { passive: true })

    this.update()
  }

  disconnect() {
    window.removeEventListener("scroll", this.onScroll)
  }

  onScroll() {
    if (this.ticking) return
    this.ticking = true

    requestAnimationFrame(() => {
      this.update()
      this.ticking = false
    })
  }

  update() {
    const y = window.scrollY

    if (y <= 0) {
      this.navTarget.classList.remove("is-shrunk")
      return
    }

    if (y > this.lastY + this.threshold) {
      this.navTarget.classList.add("is-shrunk")
    }

    if (y <= 0 - this.threshold) {
      this.navTarget.classList.remove("is-shrunk")
    }

    this.lastY = y
  }
}
