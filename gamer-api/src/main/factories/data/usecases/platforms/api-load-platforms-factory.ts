import { ApiLoadPlatforms } from '@/data/usecases/platform'
import { type LoadPlatforms } from '@/domain/usecases/platform'
import { makePlatformsIgdbGatewayFactory } from '@/main/factories/infra/api/igdb/platforms'

export const makeApiLoadPlatforms = (): LoadPlatforms => new ApiLoadPlatforms(makePlatformsIgdbGatewayFactory())
