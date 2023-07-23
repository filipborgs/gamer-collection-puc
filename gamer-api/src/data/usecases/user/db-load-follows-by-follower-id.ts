import { LoadFollowsRegistryByFollowerIdRepository } from '@/data/protocols/repo/user'
import { FollowerRegistry } from '@/domain/entities'
import { LoadFollowsByFollowerId, LoadFollowsByFollowerIdParams } from '@/domain/usecases/user'

export class DbLoadFollowsByFollowerId implements LoadFollowsByFollowerId {
  constructor (
    private readonly followRegistryRepo: LoadFollowsRegistryByFollowerIdRepository
  ) {}

  async loadFollows (data: LoadFollowsByFollowerIdParams): Promise<FollowerRegistry[]> {
    const { followerId } = data
    return await this.followRegistryRepo.loadByFollowerId(followerId)
  }
}
