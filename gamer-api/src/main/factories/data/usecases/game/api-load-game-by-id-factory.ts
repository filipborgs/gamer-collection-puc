import { ApiLoadGameById } from '@/data/usecases/game'
import { LoadGameById } from '@/domain/usecases/game'
import { makeGamesIgdbGatewayFactory } from '@/main/factories/infra/api/igdb/game'

export const makeApiLoadGameById = (): LoadGameById => new ApiLoadGameById(makeGamesIgdbGatewayFactory())
