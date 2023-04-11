import { PlatformsIgdbGateway } from '@/infra/api/igdb/platform/platforms-igdb-gateway'
import env from '@/main/config/env'
import { makeAxiosClient } from '@/main/factories/infra/gateway'

export const makePlatformsIgdbGatewayFactory = (): PlatformsIgdbGateway => new PlatformsIgdbGateway(
  makeAxiosClient(),
  env.clientId,
  env.secret,
  env.twitchAuthUrl,
  env.igdbUrl
)
