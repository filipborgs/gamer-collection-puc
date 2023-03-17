import { type Hasher } from '@/data/protocols/criptography'
import { type AddUserRepository, type LoadUserByEmailRepository } from '@/data/protocols/repo/users'
import { type AddUser, type AddUserParams } from '@/domain/usecases/users'

export class DbAddUser implements AddUser {
  constructor (
    private readonly hasher: Hasher,
    private readonly userRepository: AddUserRepository & LoadUserByEmailRepository
  ) {}

  async add (data: AddUserParams): Promise<string> {
    const existsAccount = await this.userRepository.loadByEmail(data.email)
    if (existsAccount) return null
    const password = await this.hasher.hash(data.password)

    const { id } = await this.userRepository.add({
      ...data,
      password
    })
    return id
  }
}
