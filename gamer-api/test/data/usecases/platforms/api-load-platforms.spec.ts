import { type LoadPlatformsGateway } from '@/data/protocols/api/platforms'
import { ApiLoadPlatforms } from '@/data/usecases/platforms'
import { type LoadGamesParams } from '@/domain/usecases/games'
import { mockLoadGamesParams, mockLoadPlatforms } from '@/test/domain/usecases/mocks'
import { mock, type MockProxy } from 'jest-mock-extended'

describe('ApiLoadPlatforms', () => {
  let sut: ApiLoadPlatforms
  let platformGateway: MockProxy<LoadPlatformsGateway>
  let params: LoadGamesParams

  beforeEach(() => {
    platformGateway = mock<LoadPlatformsGateway>()
    platformGateway.load.mockResolvedValue(mockLoadPlatforms())

    params = mockLoadGamesParams()

    sut = new ApiLoadPlatforms(platformGateway)
  })

  it('Should call LoadPlatformsGateway with query', async () => {
    await sut.load(params)
    const { search, offset } = params
    expect(platformGateway.load).toBeCalledWith(search, offset)
  })

  it('Should call LoadPlatformsGateway with empty string if search is null', async () => {
    await sut.load({
      search: null,
      offset: 1
    })
    expect(platformGateway.load).toBeCalledWith('', 1)
  })

  it('Should call LoadPlatformsGateway with 0 if offset is null', async () => {
    await sut.load({
      search: 'query',
      offset: null
    })
    expect(platformGateway.load).toBeCalledWith('query', 0)
  })

  it('Should throw an error if LoadPlatformsGateway throws', async () => {
    const error = new Error('an error')
    platformGateway.load.mockRejectedValueOnce(error)
    const promise = sut.load(params)
    await expect(promise).rejects.toThrow(error)
  })

  it('Should return a list of games if successful', async () => {
    const list = await sut.load(params)
    expect(list).toEqual(mockLoadPlatforms())
  })
})
