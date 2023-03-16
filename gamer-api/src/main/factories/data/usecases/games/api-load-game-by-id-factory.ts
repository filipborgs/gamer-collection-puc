import { ApiLoadGameById } from '@/data/usecases/games'
import { type LoadGameById } from '@/domain/usecases/games'
import { makeGamesIgdbGatewayFactory } from '@/main/factories/infra/api/games'

export const makeApiLoadGameById = (): LoadGameById => new ApiLoadGameById(makeGamesIgdbGatewayFactory())
