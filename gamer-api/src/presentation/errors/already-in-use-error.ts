export class AlreadyInUseError extends Error {
  constructor (param: string) {
    super(`The field already in use: ${param}`)
    this.name = 'AlreadyInUseError'
  }
}
