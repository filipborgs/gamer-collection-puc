export class MissingParamError extends Error {
  constructor (paramName: string) {
    super(`Missing required param: ${paramName}`)
    this.name = 'MissingParamError'
  }
}
