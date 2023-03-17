import { ApiLoadGameById } from '@/data/usecases/games'
import { type LoadGameById } from '@/domain/usecases/games'
import { makeGamesIgdbGatewayFactory } from '@/main/factories/infra/api/igdb/games'

export const makeApiLoadGameById = (): LoadGameById => new ApiLoadGameById(makeGamesIgdbGatewayFactory())
