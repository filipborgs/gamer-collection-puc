export class TokenExpiredError extends Error {
  private readonly _expiredAt: Date

  constructor (expiredAt: Date) {
    super('Token expired')
    this.name = 'TokenExpiredError'
    this._expiredAt = expiredAt
  }

  get expiredAt (): Date {
    return this.expiredAt
  }
}
