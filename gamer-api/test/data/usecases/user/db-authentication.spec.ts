import { HashCompare, JwtGenerator } from '@/data/protocols/criptography'
import { LoadUserByEmailRepository } from '@/data/protocols/repo/user'
import { DbAuthentication } from '@/data/usecases/user'
import { AuthenticationParams } from '@/domain/usecases/user'
import { mockUser } from '@/test/domain/entities/mocks'
import { mockAuthenticationParams } from '@/test/domain/usecases/mocks'
import { mock, MockProxy } from 'jest-mock-extended'

describe('DbAuthentication', () => {
  let sut: DbAuthentication
  let hasher: MockProxy<HashCompare>
  let jwtGenerator: MockProxy<JwtGenerator>
  let userRepository: MockProxy<LoadUserByEmailRepository>
  let params: AuthenticationParams

  beforeEach(() => {
    hasher = mock()
    hasher.compare.mockResolvedValue(true)

    jwtGenerator = mock()
    jwtGenerator.generate.mockResolvedValue('any_jwt')

    userRepository = mock()
    userRepository.loadByEmail.mockResolvedValue(mockUser())

    sut = new DbAuthentication(userRepository, hasher, jwtGenerator)
    params = mockAuthenticationParams()
  })

  test('Should call LoadUserByEmailRepository with correct email', async () => {
    await sut.login(params)
    expect(userRepository.loadByEmail).toHaveBeenCalledWith('any_email@mail.com')
  })

  test('should throw if LoadUserByEmailRepository throws', async () => {
    const error = new Error('any_error')
    userRepository.loadByEmail.mockRejectedValueOnce(error)
    const promise = sut.login(params)
    await expect(promise).rejects.toThrow(error)
  })

  test('should return null if LoadUserByEmailRepository retuns null', async () => {
    userRepository.loadByEmail.mockResolvedValueOnce(null)
    const token = await sut.login(params)
    expect(token).toBeNull()
  })

  test('should call HashComparer with correct password', async () => {
    await sut.login(params)
    expect(hasher.compare).toBeCalledWith(params.password, 'hashed_password')
  })

  test('should throw if HashComparer throws', async () => {
    const error = new Error('any_error')
    hasher.compare.mockRejectedValueOnce(error)
    const result = sut.login(params)
    await expect(result).rejects.toThrow(error)
  })

  test('should return null if HashComparer retuns false', async () => {
    hasher.compare.mockResolvedValueOnce(false)
    const token = await sut.login(params)
    expect(token).toBeNull()
  })

  test('should call TokenGenerator with correct id', async () => {
    await sut.login(params)
    const { id } = mockUser()
    expect(jwtGenerator.generate).toBeCalledWith({ user: { id } })
  })

  test('should throw if TokenGenerator throws', async () => {
    const error = new Error('any_error')
    jwtGenerator.generate.mockRejectedValueOnce(error)
    const result = sut.login(params)
    await expect(result).rejects.toThrow(error)
  })

  test('should return a token if HashComparer retuns a token', async () => {
    const token = await sut.login(params)
    expect(token).toEqual('any_jwt')
  })
})
