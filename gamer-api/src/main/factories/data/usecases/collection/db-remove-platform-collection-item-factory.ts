import { DbRemoveCollectionItem } from '@/data/usecases/collection'
import { RemoveCollectionItem } from '@/domain/usecases/collection'
import { makePlatformCollectionPostgresFactory } from '@/main/factories/infra/repo/postgres/collection'

export const makeDbRemovePlatformCollectionItem = (): RemoveCollectionItem => new DbRemoveCollectionItem(
  makePlatformCollectionPostgresFactory()
)
