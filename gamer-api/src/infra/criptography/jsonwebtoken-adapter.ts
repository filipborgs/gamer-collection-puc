import { type JwtGenerator } from '@/data/protocols/criptography'
import jwt from 'jsonwebtoken'

export class JsonWebTokenAdapter implements JwtGenerator {
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
}
