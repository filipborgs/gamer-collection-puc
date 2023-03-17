import { ApiLoadGames } from '@/data/usecases/games'
import { type LoadGames } from '@/domain/usecases/games'
import { makeGamesIgdbGatewayFactory } from '@/main/factories/infra/api/igdb/games'

export const makeApiLoadGames = (): LoadGames => new ApiLoadGames(makeGamesIgdbGatewayFactory())
