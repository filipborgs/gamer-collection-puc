import { type Hasher } from '@/data/protocols/criptography'
import { type Uuid } from '@/data/protocols/datatype'
import { type AddUserRepository, type LoadUserByEmailRepository } from '@/data/protocols/repo/users'
import { type AddUser, type AddUserParams } from '@/domain/usecases/users'

export class DbAddUser implements AddUser {
  constructor (
    private readonly hasher: Hasher,
    private readonly userRepository: AddUserRepository & LoadUserByEmailRepository,
    private readonly uuid: Uuid
  ) {}

  async add ({ password, name, email }: AddUserParams): Promise<string> {
    const existsAccount = await this.userRepository.loadByEmail(email)
    if (existsAccount) return null
    const hash = await this.hasher.hash(password)
    const id = this.uuid.generate()

    await this.userRepository.add({ id, name, email, password: hash })

    return id
  }
}
