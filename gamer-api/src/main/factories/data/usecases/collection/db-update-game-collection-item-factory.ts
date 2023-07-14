import { DbUpdateGameCollectionItem } from '@/data/usecases/collection'
import { UpdateGameCollectionItem } from '@/domain/usecases/collection'
import { makeGameCollectionPostgresFactory } from '@/main/factories/infra/repo/postgres/collection'

export const makeDbUpdateGameCollectionItem = (): UpdateGameCollectionItem => new DbUpdateGameCollectionItem(
  makeGameCollectionPostgresFactory()
)
