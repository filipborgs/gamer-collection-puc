import { type JwtDecoder } from '@/data/protocols/criptography'
import { type User } from '@/domain/entities'
import { type TokenValidation } from '@/domain/usecases/users'
import { UnauthorizedError } from '@/presentation/errors'

export class JwtTokenValidation implements TokenValidation {
  constructor (private readonly decoder: JwtDecoder) {}

  async validate (token: string): Promise<User> {
    const { user } = await this.decoder.decode(token)
    if (!user) throw new UnauthorizedError()
    return user as User
  }
}
