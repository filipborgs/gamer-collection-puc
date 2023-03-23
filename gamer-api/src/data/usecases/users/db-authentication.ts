import { type JwtGenerator, type HashCompare } from '@/data/protocols/criptography'
import { type LoadUserByEmailRepository } from '@/data/protocols/repo/users'
import { type AuthenticationParams, type Authentication } from '@/domain/usecases/users'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmail: LoadUserByEmailRepository,
    private readonly hashCompare: HashCompare,
    private readonly encripter: JwtGenerator
  ) {}

  async login (authentication: AuthenticationParams): Promise<string | null> {
    const account = await this.loadAccountByEmail.loadByEmail(authentication.email)
    if (!account) return null

    const isEqual = await this.hashCompare.compare(authentication.password, account.password)
    if (!isEqual) return null

    const token = await this.encripter.generate({ id: account.id })
    return token
  }
}
