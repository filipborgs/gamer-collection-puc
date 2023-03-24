export class TokenExpiredError extends Error {
  private readonly _expiredAt: number

  constructor (expiredAt: number) {
    super('Token expired')
    this.name = 'TokenExpiredError'
    this._expiredAt = expiredAt
  }

  get expiredAt (): number {
    return this.expiredAt
  }
}
