import { DbLoadCollections } from '@/data/usecases/collection'
import { LoadCollections } from '@/domain/usecases/collection'
import { makeCollectionPostgresFactory } from '@/main/factories/infra/repo/postgres/collection'

export const makeDbLoadCollection = (): LoadCollections => new DbLoadCollections(
  makeCollectionPostgresFactory()
)
