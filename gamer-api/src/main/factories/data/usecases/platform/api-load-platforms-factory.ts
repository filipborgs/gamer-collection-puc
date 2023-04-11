import { ApiLoadPlatforms } from '@/data/usecases/platform'
import { LoadPlatforms } from '@/domain/usecases/platform'
import { makePlatformsIgdbGatewayFactory } from '@/main/factories/infra/api/igdb/platform'

export const makeApiLoadPlatforms = (): LoadPlatforms => new ApiLoadPlatforms(makePlatformsIgdbGatewayFactory())
