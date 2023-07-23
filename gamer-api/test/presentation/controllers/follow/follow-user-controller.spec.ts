import { FollowUser } from '@/domain/usecases/user'
import { FollowUserController } from '@/presentation/controllers/follow'
import { noContent, serverError } from '@/presentation/helpers/http'
import { HttpRequest } from '@/presentation/protocols'
import { MockProxy, mock } from 'jest-mock-extended'

describe('FollowUserController', () => {
  let sut: FollowUserController
  let addCollection: MockProxy<FollowUser>
  let httpRequest: HttpRequest

  beforeEach(() => {
    addCollection = mock()
    addCollection.follow.mockResolvedValue(undefined)
    sut = new FollowUserController(addCollection)
    httpRequest = makeHttpRequest()
  })

  const makeHttpRequest = (): HttpRequest => ({
    headers: {
      user: {
        id: '80727abe-7d17-4706-8a90-69817cb90e93'
      }
    },
    body: {
      followedId: 'any_id'
    }
  })

  it('Should call AddItemToCollection with collection data', async () => {
    await sut.handle(httpRequest)
    const { body, headers: { user: { id } } } = httpRequest
    expect(addCollection.follow).toHaveBeenCalledWith({ ...body, followerId: id })
  })

  it('Should return ServerError if AddItemToCollection Throws', async () => {
    const error = new Error('any')
    addCollection.follow.mockRejectedValueOnce(error)
    const response = await sut.handle(httpRequest)
    expect(response).toEqual(serverError(error))
  })

  it('Should return 204  if succeds', async () => {
    const response = await sut.handle(httpRequest)
    expect(response).toEqual(noContent())
  })
})
