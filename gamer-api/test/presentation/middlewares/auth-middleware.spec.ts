import { TokenValidation } from '@/domain/usecases/user'
import { forbidden, ok, serverError, unauthorized } from '@/presentation/helpers/http/http-helper'
import { mockUser } from '@/test/domain/entities/mocks'
import { mock, MockProxy } from 'jest-mock-extended'
import { AuthMiddleware } from '@/presentation/middlewares'
import { AccessDeniedError, UnauthorizedError } from '@/presentation/errors'
import { HttpRequest } from '@/presentation/protocols'

describe('Auth Middleware', () => {
  let sut: AuthMiddleware
  let tokenValidatior: MockProxy<TokenValidation>
  let httpRequest: HttpRequest

  beforeEach(() => {
    jest.useFakeTimers()
    tokenValidatior = mock()
    tokenValidatior.validate.mockResolvedValue(mockUser())
    sut = new AuthMiddleware(tokenValidatior)
    httpRequest = makeHttpRequest()
  })

  const makeHttpRequest = (): HttpRequest => ({
    headers: {
      'x-access-token': 'any_token'
    }
  })

  test('Should returns 403 if no x-access-token exists in headers', async () => {
    const response = await sut.handle({})
    expect(response).toEqual(forbidden(new AccessDeniedError()))
  })

  test('Should call LoadAccountByToken with correct values', async () => {
    await sut.handle(httpRequest)
    expect(tokenValidatior.validate).toBeCalledWith(httpRequest.headers['x-access-token'])
  })

  test('Should returns 403 if LoadAccountByToken returns null', async () => {
    tokenValidatior.validate.mockResolvedValue(null)
    const response = await sut.handle(httpRequest)
    expect(response).toEqual(forbidden(new AccessDeniedError()))
  })

  test('Should returns 401 if LoadAccountByToken throws an UnauthorizedError', async () => {
    tokenValidatior.validate.mockRejectedValueOnce(new UnauthorizedError())
    const response = await sut.handle(httpRequest)
    expect(response).toEqual(unauthorized())
  })

  test('Should returns 500 if LoadAccountByToken throws an not domain error', async () => {
    const throwError = new Error('test')
    tokenValidatior.validate.mockRejectedValueOnce(throwError)
    const response = await sut.handle(httpRequest)
    expect(response).toEqual(serverError(throwError))
  })

  test('Should returns 200 succeeds', async () => {
    const response = await sut.handle(httpRequest)
    expect(response).toEqual(ok({ user: mockUser() }))
  })
})
