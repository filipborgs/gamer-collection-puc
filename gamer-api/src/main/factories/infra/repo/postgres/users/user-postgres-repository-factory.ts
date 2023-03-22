import { UserPostgresRepository } from '@/infra/repos/postgres/repo/users'

export const makeUserPostgresFactory = (): UserPostgresRepository => new UserPostgresRepository()
