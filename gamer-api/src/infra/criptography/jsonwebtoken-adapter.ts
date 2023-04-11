import { JwtDecoder, JwtGenerator } from '@/data/protocols/criptography'
import { TokenExpiredError } from '@/domain/entities'
import { UnauthorizedError } from '@/presentation/errors'
import jwt from 'jsonwebtoken'

export class JsonWebTokenAdapter implements JwtGenerator, JwtDecoder {
  constructor (
    private readonly privateKey: string,
    private readonly expiresIn: string | number
  ) {}

  async generate (data: any): Promise<string> {
    return await new Promise((resolve, reject) => {
      jwt.sign(data, this.privateKey, { expiresIn: this.expiresIn }, (err, token) => {
        if (err) reject(err)
        resolve(token)
      })
    })
  }

  async decode (token: string): Promise<any> {
    return await new Promise((resolve, reject) => {
      jwt.verify(token, this.privateKey, function (err, decoded) {
        if (err) {
          switch (err.name) {
            case 'TokenExpiredError':
              // eslint-disable-next-line no-case-declarations
              const error: any = err
              throw new TokenExpiredError(error.expiredAt)
            case 'JsonWebTokenError':
            case 'NotBeforeError':
              throw new UnauthorizedError()
            default:
              throw err
          }
        }
        resolve(decoded as any)
      })
    })
  }
}
