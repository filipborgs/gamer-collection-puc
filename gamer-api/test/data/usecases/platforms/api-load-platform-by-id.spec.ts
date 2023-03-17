import { type LoadPlatformByIdGateway } from '@/data/protocols/api/platforms'
import { ApiLoadPlatformById } from '@/data/usecases/platforms'
import { mockLoadPlatformById } from '@/test/domain/usecases/mocks'
import { mock, type MockProxy } from 'jest-mock-extended'

describe('ApiLoadPlatformById', () => {
  let sut: ApiLoadPlatformById
  let platformGateway: MockProxy<LoadPlatformByIdGateway>
  let params: number

  beforeEach(() => {
    jest.useFakeTimers()
    platformGateway = mock<LoadPlatformByIdGateway>()
    platformGateway.loadById.mockResolvedValue(mockLoadPlatformById())

    params = 48

    sut = new ApiLoadPlatformById(platformGateway)
  })

  it('Should call LoadPlatformByIdGateway with id', async () => {
    await sut.loadById(params)
    expect(platformGateway.loadById).toBeCalledWith(params)
  })

  it('Should throw an error if LoadPlatformByIdGateway throws', async () => {
    const error = new Error('an error')
    platformGateway.loadById.mockRejectedValueOnce(error)
    const promise = sut.loadById(params)
    await expect(promise).rejects.toThrow(error)
  })

  it('Should return null if LoadPlatformByIdGateway returns null', async () => {
    platformGateway.loadById.mockReturnValueOnce(null)
    const game = await sut.loadById(params)
    expect(game).toEqual(null)
  })

  it('Should return the correct platform if successful', async () => {
    const platform = await sut.loadById(params)
    expect(platform).toEqual(mockLoadPlatformById())
  })
})
