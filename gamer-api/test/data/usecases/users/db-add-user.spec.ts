import { Hasher } from '@/data/protocols/criptography'
import { Uuid } from '@/data/protocols/datatype'
import { AddUserRepository, LoadUserByEmailRepository } from '@/data/protocols/repo/users'
import { DbAddUser } from '@/data/usecases/user'
import { AddUserParams } from '@/domain/usecases/user'
import { mockAddUserParams } from '@/test/domain/usecases/mocks'
import { mock, MockProxy } from 'jest-mock-extended'

describe('DbAddUser', () => {
  let sut: DbAddUser
  let hasher: MockProxy<Hasher>
  let uuid: MockProxy<Uuid>
  let userRepository: MockProxy<AddUserRepository & LoadUserByEmailRepository>
  let params: AddUserParams

  beforeEach(() => {
    hasher = mock()
    hasher.hash.mockResolvedValue('any_hash')

    uuid = mock()
    uuid.generate.mockReturnValueOnce('any_uuid')

    userRepository = mock()
    userRepository.loadByEmail.mockResolvedValue(null)
    userRepository.add.mockResolvedValue({ id: 'any_id' } as any)

    sut = new DbAddUser(hasher, userRepository, uuid)
    params = mockAddUserParams()
  })

  test('Should call LoadUserByEmailRepository with correct email', async () => {
    await sut.add(params)
    expect(userRepository.loadByEmail).toHaveBeenCalledWith(params.email)
  })

  test('Should return null if LoadUserByEmailRepository returns an account', async () => {
    userRepository.loadByEmail.mockResolvedValueOnce({
      id: 'any_id'
    } as any)
    const response = await sut.add(params)
    expect(response).toBeNull()
  })

  test('Should throw if LoadUserByEmailRepository throws', async () => {
    const error = new Error('an error')
    userRepository.loadByEmail.mockRejectedValueOnce(error)
    const promise = sut.add(params)
    await expect(promise).rejects.toThrow(error)
  })

  it('Should call Hasher with correct values', async () => {
    await sut.add(params)
    expect(hasher.hash).toBeCalledWith(params.password)
  })

  it('Should throw if Hasher throws', async () => {
    const error = new Error('an error')
    hasher.hash.mockRejectedValueOnce(error)
    const promise = sut.add(params)
    await expect(promise).rejects.toThrow(error)
  })

  it('Should call Uuid with correct values', async () => {
    await sut.add(params)
    expect(uuid.generate).toBeCalledWith()
  })

  it('Should throw if Uuid throws', async () => {
    const error = new Error('an error')
    uuid.generate.mockReset()
    uuid.generate.mockImplementationOnce(() => { throw error })
    const promise = sut.add(params)
    await expect(promise).rejects.toThrow(error)
  })

  it('Should throw if AddUserRepository throws', async () => {
    const error = new Error('an error')
    userRepository.add.mockRejectedValueOnce(error)
    const promise = sut.add(params)
    await expect(promise).rejects.toThrow(error)
  })

  it('Should call call AddUserRepository with correct data', async () => {
    await sut.add(params)
    expect(userRepository.add).toBeCalledWith({
      ...params,
      id: 'any_uuid',
      password: 'any_hash'
    })
  })

  it('Should return user id on success', async () => {
    const id = await sut.add(params)
    expect(id).toEqual('any_uuid')
  })
})
