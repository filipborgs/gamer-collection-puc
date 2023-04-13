export class InvalidParamError extends Error {
  constructor () {
    super('Formulário inválido')
    this.name = 'InvalidParamError'
  }
}
