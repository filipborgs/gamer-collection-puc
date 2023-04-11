import { ApiLoadGameById } from '@/data/usecases/game'
import { type LoadGameById } from '@/domain/usecases/game'
import { makeGamesIgdbGatewayFactory } from '@/main/factories/infra/api/igdb/games'

export const makeApiLoadGameById = (): LoadGameById => new ApiLoadGameById(makeGamesIgdbGatewayFactory())
