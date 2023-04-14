export class NotFoundError extends Error {
  constructor (name = 'Item') {
    super(`${name} não encontrado`)
    this.name = 'NotFoundError'
  }
}
