import { type Hasher } from '@/data/protocols/criptography'
import { type AddUserRepository, type LoadUserByEmailRepository } from '@/data/protocols/repo/users'
import { DbAddUser } from '@/data/usecases/users'
import { type AddUserParams } from '@/domain/usecases/users'
import { mock, type MockProxy } from 'jest-mock-extended'

describe('DbAddUser', () => {
  let sut: DbAddUser
  let hasher: MockProxy<Hasher>
  let userRepository: MockProxy<AddUserRepository & LoadUserByEmailRepository>
  let params: AddUserParams

  beforeEach(() => {
    hasher = mock()
    hasher.hash.mockResolvedValue('any_hash')

    userRepository = mock()
    userRepository.loadByEmail.mockResolvedValue(null)
    userRepository.add.mockResolvedValue({ id: 'any_id' } as any)

    sut = new DbAddUser(hasher, userRepository)
    params = mockAddUserParams()
  })

  const mockAddUserParams = (): AddUserParams => ({
    name: 'any_name',
    email: 'any_email',
    password: 'any_password'
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

  it('Should call hash with correct values', async () => {
    await sut.add(params)

    expect(hasher.hash).toBeCalledWith(params.password)
  })

  it('Should throw if Hasher throws', async () => {
    const error = new Error('an error')
    hasher.hash.mockRejectedValueOnce(error)
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
      password: 'any_hash'
    })
  })

  it('Should return user id on success', async () => {
    const id = await sut.add(params)
    expect(id).toEqual('any_id')
  })
})
