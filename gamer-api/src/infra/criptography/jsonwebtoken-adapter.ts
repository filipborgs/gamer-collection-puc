import { type JwtDecoder, type JwtGenerator } from '@/data/protocols/criptography'
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

  async decode (token: string): Promise<object> {
    return await new Promise((resolve, reject) => {
      jwt.verify(token, this.privateKey, function (err, decoded) {
        if (err) reject(err)
        resolve(decoded as any)
      })
    })
  }
}
