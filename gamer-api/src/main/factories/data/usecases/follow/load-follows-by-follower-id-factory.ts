import { DbLoadFollowsByFollowerId } from '@/data/usecases/user'
import { LoadFollowsByFollowerId } from '@/domain/usecases/user'
import { makeFollowerRegistryPostgresRepositoryFactory } from '@/main/factories/infra/repo/postgres/follow'

export const makeDbLoadFollowsByFollowerId = (): LoadFollowsByFollowerId => new DbLoadFollowsByFollowerId(
  makeFollowerRegistryPostgresRepositoryFactory()
)
