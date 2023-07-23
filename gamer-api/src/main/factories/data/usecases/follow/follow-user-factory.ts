import { DbFollowUser } from '@/data/usecases/user'
import { FollowUser } from '@/domain/usecases/user'
import { makeFollowerRegistryPostgresRepositoryFactory } from '@/main/factories/infra/repo/postgres/follow'

export const makeDbFollowUser = (): FollowUser => new DbFollowUser(
  makeFollowerRegistryPostgresRepositoryFactory()
)
