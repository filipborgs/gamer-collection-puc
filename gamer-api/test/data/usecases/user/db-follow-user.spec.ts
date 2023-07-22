import { AddFollowRegistryRepository } from '@/data/protocols/repo/user'
import { DbFollowUser } from '@/data/usecases/user'
import { FollowUserParams } from '@/domain/usecases/user'
import { mockFollowUserParams } from '@/test/domain/usecases/mocks'
import { MockProxy, mock } from 'jest-mock-extended'

describe('DbFollowUser', () => {
  let sut: DbFollowUser
  let followRepository: MockProxy<AddFollowRegistryRepository>
  let params: FollowUserParams

  beforeEach(() => {
    followRepository = mock()
    followRepository.add.mockResolvedValue(undefined)

    sut = new DbFollowUser(followRepository)
    params = mockFollowUserParams()
  })

  test('Should call AddFollowRegistryRepository with correct ids', async () => {
    await sut.follow(params)
    expect(followRepository.add).toHaveBeenCalledWith(params)
  })

  test('should throw if AddFollowRegistryRepository throws', async () => {
    const error = new Error('any_error')
    followRepository.add.mockRejectedValueOnce(error)
    const promise = sut.follow(params)
    await expect(promise).rejects.toThrow(error)
  })

  test('should resolve promise if succeds', async () => {
    const promise = sut.follow(params)
    await expect(promise).resolves.not.toThrow()
  })
})
