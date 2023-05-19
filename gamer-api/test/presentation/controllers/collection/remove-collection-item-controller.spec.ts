import { RemoveCollectionItem } from '@/domain/usecases/collection'
import { RemoveCollectionItemController } from '@/presentation/controllers/collection'
import { noContent, serverError } from '@/presentation/helpers/http'
import { HttpRequest } from '@/presentation/protocols'
import { MockProxy, mock } from 'jest-mock-extended'

describe('RemoveCollectionItemController', () => {
  let sut: RemoveCollectionItemController
  let removeItemUsecase: MockProxy<RemoveCollectionItem>
  let httpRequest: HttpRequest

  beforeEach(() => {
    jest.useFakeTimers()
    removeItemUsecase = mock()
    sut = new RemoveCollectionItemController(removeItemUsecase)
    httpRequest = makeHttpRequest()
  })

  const makeHttpRequest = (): HttpRequest => ({
    params: {
      itemId: 'any_id'
    }
  })

  it('Should call RemoveCollectionItem with userId', async () => {
    await sut.handle(httpRequest)
    const { params: { itemId } } = httpRequest
    expect(removeItemUsecase.remove).toHaveBeenCalledWith(itemId)
  })

  it('Should return ServerError if RemoveCollectionItem Throws', async () => {
    const error = new Error('any')
    removeItemUsecase.remove.mockRejectedValueOnce(error)
    const response = await sut.handle(httpRequest)
    expect(response).toEqual(serverError(error))
  })

  it('Should return 204 if succeds', async () => {
    const response = await sut.handle(httpRequest)
    expect(response).toEqual(noContent())
  })
})
