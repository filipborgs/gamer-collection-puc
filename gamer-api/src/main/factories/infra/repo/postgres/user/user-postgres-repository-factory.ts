import { UserPostgresRepository } from '@/infra/repos/postgres/repo/user'

export const makeUserPostgresFactory = (): UserPostgresRepository => new UserPostgresRepository()
