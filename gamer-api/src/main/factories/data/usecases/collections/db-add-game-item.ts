import { DbAddGameItem } from '@/data/usecases/collection'
import { AddGameCollectionItem } from '@/domain/usecases/collection'
import { makeGamesIgdbGatewayFactory } from '@/main/factories/infra/api/igdb/games'
import { makeUuidAdapter } from '@/main/factories/infra/datatype'
import { makeGameCollectionPostgresFactory } from '@/main/factories/infra/repo/postgres/collections'

export const makeDbAddGameItem = (): AddGameCollectionItem => new DbAddGameItem(
  makeGamesIgdbGatewayFactory(),
  makeGameCollectionPostgresFactory(),
  makeUuidAdapter()
)
