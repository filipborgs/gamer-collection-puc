import { FollowerRegistryPostgresRepository } from '@/infra/repos/postgres/repo/user'

export const makeFollowerRegistryPostgresRepositoryFactory = (): FollowerRegistryPostgresRepository => new FollowerRegistryPostgresRepository()
