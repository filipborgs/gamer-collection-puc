import { DbAddItemToCollection } from '@/data/usecases/collections'
import { type AddItemToCollection } from '@/domain/usecases/collection'
import { makeGamesIgdbGatewayFactory } from '@/main/factories/infra/api/igdb/games'
import { makeUuidAdapter } from '@/main/factories/infra/datatype'
import { makeGameCollectionPostgresFactory } from '@/main/factories/infra/repo/postgres/collections'

export const makeDbAddItemToCollection = (): AddItemToCollection => new DbAddItemToCollection(
  makeGamesIgdbGatewayFactory(),
  makeGameCollectionPostgresFactory(),
  makeUuidAdapter()
)
