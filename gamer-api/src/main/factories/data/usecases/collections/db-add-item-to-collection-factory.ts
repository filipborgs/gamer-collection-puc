import { DbAddItemToCollection } from '@/data/usecases/collection'
import { type AddGameCollectionItem } from '@/domain/usecases/collection'
import { makeGamesIgdbGatewayFactory } from '@/main/factories/infra/api/igdb/games'
import { makeUuidAdapter } from '@/main/factories/infra/datatype'
import { makeGameCollectionPostgresFactory } from '@/main/factories/infra/repo/postgres/collections'

export const makeDbAddItemToCollection = (): AddGameCollectionItem => new DbAddItemToCollection(
  makeGamesIgdbGatewayFactory(),
  makeGameCollectionPostgresFactory(),
  makeUuidAdapter()
)
