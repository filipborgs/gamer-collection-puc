import { DbRemoveCollectionItem } from '@/data/usecases/collection'
import { RemoveCollectionItem } from '@/domain/usecases/collection'
import { makeGameCollectionPostgresFactory } from '@/main/factories/infra/repo/postgres/collection'

export const makeDbRemoveGameCollectionItem = (): RemoveCollectionItem => new DbRemoveCollectionItem(
  makeGameCollectionPostgresFactory()
)
