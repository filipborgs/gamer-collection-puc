export class ServerError extends Error {
  constructor (stack: string) {
    console.log(stack)
    super('Internal server error')
    this.name = 'ServerError'
    this.stack = stack
  }
}
