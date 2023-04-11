import { ApiLoadPlatformById } from '@/data/usecases/platform'
import { LoadPlatformById } from '@/domain/usecases/platform'
import { makePlatformsIgdbGatewayFactory } from '@/main/factories/infra/api/igdb/platforms'

export const makeApiLoadPlatformById = (): LoadPlatformById => new ApiLoadPlatformById(makePlatformsIgdbGatewayFactory())
