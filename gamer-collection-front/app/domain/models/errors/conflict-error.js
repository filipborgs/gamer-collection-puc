export class ConflictError extends Error {
  constructor (name = 'O item') {
    super(`${name} não pode ser deletado ou não foi encontrado`)
    this.name = 'ConflictError'
  }
}
