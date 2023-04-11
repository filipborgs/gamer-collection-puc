import { makeApiLoadPlatforms } from '@/main/factories/data/usecases/platform'
import { LoadPlatformsController } from '@/presentation/controllers/platform'
import { Controller } from '@/presentation/protocols'

export const makeLoadPlatformsController = (): Controller => new LoadPlatformsController(makeApiLoadPlatforms())
