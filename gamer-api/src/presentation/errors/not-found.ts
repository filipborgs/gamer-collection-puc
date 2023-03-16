export class NotFound extends Error {
  constructor (item: string) {
    super(`${item} not found`)
    this.name = 'NotFound'
  }
}
