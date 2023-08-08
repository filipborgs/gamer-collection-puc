export class RouterAdapter {
  constructor() {
    this.router = window.$nuxt._router
  }

  push(route) {
    this.router.push(route)
  }
}
