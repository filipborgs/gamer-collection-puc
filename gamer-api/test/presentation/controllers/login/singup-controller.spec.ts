import { type AddUser } from '@/domain/usecases/users'
import { SingUpController } from '@/presentation/controllers/login'
import { AlreadyInUseError, InvalidParamError } from '@/presentation/errors'
import { badRequest, created, forbidden, serverError } from '@/presentation/helpers/http'
import { type HttpRequest } from '@/presentation/protocols'
import { mock, type MockProxy } from 'jest-mock-extended'

describe('SingUpController', () => {
  let sut: SingUpController
  let userUsecase: MockProxy<AddUser>
  let httpRequest: HttpRequest

  beforeEach(() => {
    userUsecase = mock()
    userUsecase.add.mockResolvedValue('any_id')
    sut = new SingUpController(userUsecase)
    httpRequest = makeHttpRequest()
  })

  const makeHttpRequest = (): HttpRequest => ({
    body: {
      email: 'email@example.com',
      name: 'example',
      password: 'password',
      passwordConfirmation: 'password'
    }
  })

  it('Should call AddUser with user data', async () => {
    await sut.handle(httpRequest)
    const { body: { name, email, password } } = httpRequest
    expect(userUsecase.add).toHaveBeenCalledWith({ name, email, password })
  })

  it('Should return ServerError if AddUser Throws', async () => {
    const error = new Error('any')
    userUsecase.add.mockRejectedValueOnce(error)
    const response = await sut.handle(httpRequest)
    expect(response).toEqual(serverError(error))
  })

  it('Should return 400 if passwordConfirmation is wrong', async () => {
    httpRequest.body.passwordConfirmation = 'wrong password'
    const response = await sut.handle(httpRequest)
    expect(response).toEqual(badRequest(new InvalidParamError('password confirmation')))
  })

  it('Should return 403 if AddUser returns null', async () => {
    userUsecase.add.mockResolvedValueOnce(null)
    const response = await sut.handle(httpRequest)
    expect(response).toEqual(forbidden(new AlreadyInUseError('email')))
  })

  it('Should return 201 with user id if succeds', async () => {
    const response = await sut.handle(httpRequest)
    expect(response).toEqual(created({ id: 'any_id' }))
  })
})
