import { ApiLoadGames } from '@/data/usecases/game'
import { type LoadGames } from '@/domain/usecases/game'
import { makeGamesIgdbGatewayFactory } from '@/main/factories/infra/api/igdb/games'

export const makeApiLoadGames = (): LoadGames => new ApiLoadGames(makeGamesIgdbGatewayFactory())
