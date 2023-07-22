import { AddFollowRegistryRepository } from '@/data/protocols/repo/user'
import { FollowUser, FollowUserParams } from '@/domain/usecases/user'

export class DbFollowUser implements FollowUser {
  constructor (
    private readonly followRegistryRepo: AddFollowRegistryRepository
  ) {}

  async follow (data: FollowUserParams): Promise<void> {
    const { followedId, followerId } = data
    await this.followRegistryRepo.add({
      followedId, followerId
    })
  }
}
