import { PlatformCollectionPostgresRepository } from '@/infra/repos/postgres/repo/collection'

export const makePlatformCollectionPostgresFactory = (): PlatformCollectionPostgresRepository => new PlatformCollectionPostgresRepository()
