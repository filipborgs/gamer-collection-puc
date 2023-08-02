import { LoadFollowsByFollowerId } from '@/domain/usecases/user'
import { LoadFollowsByFollowerIdController } from '@/presentation/controllers/follow'
import { NotFound } from '@/presentation/errors'
import { notFound, ok, serverError } from '@/presentation/helpers/http'
import { HttpRequest } from '@/presentation/protocols'
import { mockFollowerRegistry } from '@/test/domain/entities/mocks'
import { MockProxy, mock } from 'jest-mock-extended'

describe('LoadFollowsByFollowerIdController', () => {
  let sut: LoadFollowsByFollowerIdController
  let loadFollows: MockProxy<LoadFollowsByFollowerId>
  let httpRequest: HttpRequest

  beforeEach(() => {
    jest.useFakeTimers()
    loadFollows = mock()
    loadFollows.loadFollows.mockResolvedValue([mockFollowerRegistry()])
    sut = new LoadFollowsByFollowerIdController(loadFollows)
    httpRequest = makeHttpRequest()
  })

  const makeHttpRequest = (): HttpRequest => ({
    params: {
      followerId: 'any_id'
    }
  })

  it('Should call LoadFollowsByFollowerId with followerId', async () => {
    await sut.handle(httpRequest)
    const { params: { followerId } } = httpRequest
    expect(loadFollows.loadFollows).toHaveBeenCalledWith({ followerId })
  })

  it('Should return ServerError if LoadFollowsByFollowerId Throws', async () => {
    const error = new Error('any')
    loadFollows.loadFollows.mockRejectedValueOnce(error)
    const response = await sut.handle(httpRequest)
    expect(response).toEqual(serverError(error))
  })

  it('Should return 204 if LoadFollowsByFollowerId returns null', async () => {
    loadFollows.loadFollows.mockResolvedValueOnce(null)
    const response = await sut.handle(httpRequest)
    expect(response).toEqual(notFound(new NotFound('Follows')))
  })

  it('Should return 200 if succeds', async () => {
    const response = await sut.handle(httpRequest)
    expect(response).toEqual(ok([mockFollowerRegistry()]))
  })
})
