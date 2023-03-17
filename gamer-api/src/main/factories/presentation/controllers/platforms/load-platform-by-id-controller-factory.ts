import { makeApiLoadPlatformById } from '@/main/factories/data/usecases/platforms'
import { LoadPlatformByIdController } from '@/presentation/controllers/platforms'
import { type Controller } from '@/presentation/protocols'

export const makeLoadPlatformByIdController = (): Controller => new LoadPlatformByIdController(makeApiLoadPlatformById())
