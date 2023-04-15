import { DbAddPlatformItem } from '@/data/usecases/collection'
import { AddPlatformItem } from '@/domain/usecases/collection'
import { makePlatformsIgdbGatewayFactory } from '@/main/factories/infra/api/igdb/platform'
import { makeUuidAdapter } from '@/main/factories/infra/datatype'
import { makePlatformCollectionPostgresFactory } from '@/main/factories/infra/repo/postgres/collection'

export const makeDbAddPlatformItem = (): AddPlatformItem => new DbAddPlatformItem(
  makePlatformsIgdbGatewayFactory(),
  makePlatformCollectionPostgresFactory(),
  makeUuidAdapter()
)
