import { CollectionPostgresRepository } from '@/infra/repos/postgres/repo/collection'

export const makeCollectionPostgresFactory = (): CollectionPostgresRepository => new CollectionPostgresRepository()
