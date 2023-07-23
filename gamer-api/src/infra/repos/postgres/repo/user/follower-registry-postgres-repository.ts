import { Repository } from 'typeorm'
import { FollowerRegistryTypeorm } from '../../entities'
import { PgRepository } from '../../helpers'
import { AddFollowRegistryRepository, LoadFollowsRegistryByFollowerIdRepository } from '@/data/protocols/repo/user'
import { FollowerRegistry } from '@/domain/entities'

export class FollowerRegistryPostgresRepository extends PgRepository implements AddFollowRegistryRepository, LoadFollowsRegistryByFollowerIdRepository {
  private readonly repo: Repository<FollowerRegistryTypeorm>
  constructor () {
    super()
    this.repo = this.getRepository(FollowerRegistryTypeorm)
  }

  async add (data: any): Promise<void> {
    const { followedId, followerId } = data
    await this.repo.save({
      createdAt: new Date(),
      followed: {
        id: followedId
      },
      follower: {
        id: followerId
      }
    })
  }

  async loadByFollowerId (followerId: string): Promise<FollowerRegistry[]> {
    const result = await this.repo.find({
      where: {
        follower: {
          id: followerId
        }
      },
      relations: {
        followed: true,
        follower: true
      }
    })

    return result.map(({ followed, follower, createdAt }) => ({
      followed, follower, createdAt
    }))
  }
}
