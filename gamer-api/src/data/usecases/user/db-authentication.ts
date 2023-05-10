import { HashCompare, JwtGenerator } from '@/data/protocols/criptography'
import { LoadUserByEmailRepository } from '@/data/protocols/repo/user'
import { LoggedUser } from '@/domain/entities'
import { Authentication, AuthenticationParams } from '@/domain/usecases/user'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmail: LoadUserByEmailRepository,
    private readonly hashCompare: HashCompare,
    private readonly encripter: JwtGenerator
  ) {}

  async login (authentication: AuthenticationParams): Promise<LoggedUser> {
    const account = await this.loadAccountByEmail.loadByEmail(authentication.email)
    if (!account) return null

    const isEqual = await this.hashCompare.compare(authentication.password, account.password)
    if (!isEqual) return null

    const token = await this.encripter.generate({ user: { id: account.id } })
    const { id, name } = account
    return {
      token,
      id,
      name
    }
  }
}
