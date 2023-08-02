export class EmptyListError extends Error {
  constructor (name = 'item') {
    super(`Nenhum ${name} encontrado`)
    this.name = 'NotFoundError'
  }
}
