import { DbLoadGameCollectionItems } from '@/data/usecases/collection'
import { LoadGameCollectionItems } from '@/domain/usecases/collection'
import { makeGameCollectionPostgresFactory } from '@/main/factories/infra/repo/postgres/collection'

export const makeDbLoadGameCollectionItems = (): LoadGameCollectionItems => new DbLoadGameCollectionItems(
  makeGameCollectionPostgresFactory()
)
