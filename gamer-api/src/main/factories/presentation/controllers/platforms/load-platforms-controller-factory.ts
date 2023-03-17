import { makeApiLoadPlatforms } from '@/main/factories/data/usecases/platforms'
import { LoadPlatformsController } from '@/presentation/controllers/platforms'
import { type Controller } from '@/presentation/protocols'

export const makeLoadPlatformsController = (): Controller => new LoadPlatformsController(makeApiLoadPlatforms())
