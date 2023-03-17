import { ApiLoadPlatformById } from '@/data/usecases/platforms'
import { type LoadPlatformById } from '@/domain/usecases/platforms'
import { makePlatformsIgdbGatewayFactory } from '@/main/factories/infra/api/igdb/platforms'

export const makeApiLoadPlatformById = (): LoadPlatformById => new ApiLoadPlatformById(makePlatformsIgdbGatewayFactory())
