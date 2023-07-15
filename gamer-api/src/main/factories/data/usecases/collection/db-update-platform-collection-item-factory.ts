import { DbUpdatePlatformCollectionItem } from '@/data/usecases/collection'
import { UpdatePlatformCollectionItem } from '@/domain/usecases/collection'
import { makePlatformCollectionPostgresFactory } from '@/main/factories/infra/repo/postgres/collection'

export const makeDbUpdatePlatformCollectionItem = (): UpdatePlatformCollectionItem => new DbUpdatePlatformCollectionItem(
  makePlatformCollectionPostgresFactory()
)
