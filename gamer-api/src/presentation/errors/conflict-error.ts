export class ConflictError extends Error {
  constructor () {
    super('Conflict')
    this.name = 'Conflict'
  }
}
