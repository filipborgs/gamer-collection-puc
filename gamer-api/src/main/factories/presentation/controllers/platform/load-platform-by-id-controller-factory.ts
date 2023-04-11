import { makeApiLoadPlatformById } from '@/main/factories/data/usecases/platform'
import { LoadPlatformByIdController } from '@/presentation/controllers/platform'
import { Controller } from '@/presentation/protocols'

export const makeLoadPlatformByIdController = (): Controller => new LoadPlatformByIdController(makeApiLoadPlatformById())
