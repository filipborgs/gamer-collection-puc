import { LoadFollowsRegistryByFollowerIdRepository } from '@/data/protocols/repo/user'
import { DbLoadFollowsByFollowerId } from '@/data/usecases/user'
import { LoadFollowsByFollowerIdParams } from '@/domain/usecases/user'
import { mockFollowerRegistry } from '@/test/domain/entities/mocks'
import { mockFollowUserParams } from '@/test/domain/usecases/mocks'
import { MockProxy, mock } from 'jest-mock-extended'

describe('DbLoadFollowsByFollowerId', () => {
  let sut: DbLoadFollowsByFollowerId
  let followRepository: MockProxy<LoadFollowsRegistryByFollowerIdRepository>
  let params: LoadFollowsByFollowerIdParams

  beforeEach(() => {
    jest.useFakeTimers()
    followRepository = mock()
    followRepository.loadByFollowerId.mockResolvedValue([
      mockFollowerRegistry()
    ])

    sut = new DbLoadFollowsByFollowerId(followRepository)
    params = mockFollowUserParams()
  })

  test('Should call AddFollowRegistryRepository with correct id', async () => {
    await sut.loadFollows(params)
    expect(followRepository.loadByFollowerId).toHaveBeenCalledWith(params.followerId)
  })

  test('should throw if AddFollowRegistryRepository throws', async () => {
    const error = new Error('any_error')
    followRepository.loadByFollowerId.mockRejectedValueOnce(error)
    const promise = sut.loadFollows(params)
    await expect(promise).rejects.toThrow(error)
  })

  test('Should return the correct array on succeds', async () => {
    const result = await sut.loadFollows(params)
    expect(result).toEqual([mockFollowerRegistry()])
  })
})
