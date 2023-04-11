import { AddUserRepository, LoadUserByEmailRepository } from '@/data/protocols/repo/user'
import { User } from '@/domain/entities'
import { PgRepository } from '../../helpers'
import { UserTypeorm } from '../../entities'
import { Repository } from 'typeorm'

export class UserPostgresRepository extends PgRepository implements AddUserRepository, LoadUserByEmailRepository {
  private readonly repo: Repository<UserTypeorm>
  constructor () {
    super()
    this.repo = this.getRepository(UserTypeorm)
  }

  async add (data: User): Promise<void> {
    await this.repo.save(data)
  }

  async loadByEmail (email: string): Promise<User> {
    if (!email) return null
    return await this.repo.findOneBy({ email })
  }
}
