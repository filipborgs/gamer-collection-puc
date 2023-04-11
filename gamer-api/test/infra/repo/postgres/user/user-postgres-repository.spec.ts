import { UserTypeorm } from '@/infra/repos/postgres/entities'
import { PostgresHelper } from '@/infra/repos/postgres/helpers'
import { UserPostgresRepository } from '@/infra/repos/postgres/repo/user'
import { IBackup } from 'pg-mem'
import { Repository } from 'typeorm'
import { makeFakeDb } from '@/test/infra/repo/postgres/mocks'
import { mockUser } from '@/test/domain/entities/mocks'

describe('UserPostgresRepository', () => {
  let sut: UserPostgresRepository
  let connection: PostgresHelper
  let pgUserRepo: Repository<UserTypeorm>
  let backup: IBackup

  beforeAll(async () => {
    const fakeDb = await makeFakeDb()
    connection = fakeDb.connection
    await PostgresHelper.getInstance().connect()
    backup = fakeDb.db.backup()
    pgUserRepo = connection.getRepository(UserTypeorm)
  })

  beforeEach(() => {
    backup.restore()
    sut = new UserPostgresRepository()
  })

  describe('LoadUserByEmailRepository', () => {
    it('Should return the corret user', async () => {
      const userMock = mockUser()
      await pgUserRepo.insert(userMock)
      const user = await sut.loadByEmail('any_mail@example.com')
      expect(user).toEqual(userMock)
    })

    it('Should return null if not found the user', async () => {
      const userMock = mockUser()
      await pgUserRepo.insert(userMock)
      const user = await sut.loadByEmail('wrong@example.com')
      expect(user).toBeNull()
    })

    it('Should return null if the email is null', async () => {
      const userMock = mockUser()
      await pgUserRepo.insert(userMock)
      const user = await sut.loadByEmail(null)
      expect(user).toBeNull()
    })
  })

  describe('AddUserRepository', () => {
    it('Should add a user on success', async () => {
      const userMock = mockUser()
      await sut.add(userMock)
      const users = await pgUserRepo.find()
      expect(users.length).toBe(1)
      expect(users[0].id).toBe(userMock.id)
    })
  })
})
