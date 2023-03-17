import { ApiLoadPlatforms } from '@/data/usecases/platforms'
import { type LoadPlatforms } from '@/domain/usecases/platforms'
import { makePlatformsIgdbGatewayFactory } from '@/main/factories/infra/api/igdb/platforms'

export const makeApiLoadPlatforms = (): LoadPlatforms => new ApiLoadPlatforms(makePlatformsIgdbGatewayFactory())
