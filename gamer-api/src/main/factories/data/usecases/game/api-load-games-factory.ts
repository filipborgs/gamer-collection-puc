import { ApiLoadGames } from '@/data/usecases/game'
import { LoadGames } from '@/domain/usecases/game'
import { makeGamesIgdbGatewayFactory } from '@/main/factories/infra/api/igdb/game'

export const makeApiLoadGames = (): LoadGames => new ApiLoadGames(makeGamesIgdbGatewayFactory())
