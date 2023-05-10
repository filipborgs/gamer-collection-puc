import { DbLoadPlatformCollectionItems } from '@/data/usecases/collection'
import { LoadPlatformCollectionItems } from '@/domain/usecases/collection'
import { makePlatformCollectionPostgresFactory } from '@/main/factories/infra/repo/postgres/collection'

export const makeDbLoadPlatformCollectionItems = (): LoadPlatformCollectionItems => new DbLoadPlatformCollectionItems(
  makePlatformCollectionPostgresFactory()
)
