import { type Authentication } from '@/domain/usecases/users'
import { LoginController } from '@/presentation/controllers/login'
import { ok, serverError, unauthorized } from '@/presentation/helpers/http'
import { type HttpRequest } from '@/presentation/protocols'
import { mock, type MockProxy } from 'jest-mock-extended'

describe('LoginController', () => {
  let sut: LoginController
  let userUsecase: MockProxy<Authentication>
  let httpRequest: HttpRequest

  beforeEach(() => {
    userUsecase = mock()
    userUsecase.login.mockResolvedValue('any_jwt')
    sut = new LoginController(userUsecase)
    httpRequest = makeHttpRequest()
  })

  const makeHttpRequest = (): HttpRequest => ({
    body: {
      email: 'email@example.com',
      password: 'password'
    }
  })

  test('Should call Authentication with correct values', async () => {
    await sut.handle(httpRequest)
    const { email, password } = httpRequest.body
    expect(userUsecase.login).toBeCalledWith({ email, password })
  })

  test('Should return 401 if an invlid credentials are provided', async () => {
    userUsecase.login.mockResolvedValueOnce(null)
    const response = await sut.handle(httpRequest)
    expect(response).toEqual(unauthorized())
  })

  test('Should return 500 if Authentication throws', async () => {
    const error = new Error('any_error')
    userUsecase.login.mockRejectedValue(error)
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(error))
  })

  test('Should return 200 if valid credentials are provided', async () => {
    const response = await sut.handle(httpRequest)
    expect(response).toEqual(ok({ token: 'any_jwt' }))
  })
})
