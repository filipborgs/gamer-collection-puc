import { GamesIgdbGateway } from '@/infra/api/games/games-igdb-gateway'
import env from '@/main/config/env'
import { makeAxiosClient } from '@/main/factories/infra/gateway'

export const makeGamesIgdbGatewayFactory = (): GamesIgdbGateway => new GamesIgdbGateway(
  makeAxiosClient(),
  env.clientId,
  env.secret,
  env.twitchAuthUrl,
  env.igdbUrl
)
