import { makeDbAddPlatformItem } from '@/main/factories/data/usecases/collection'
import { AddPlatformToCollectionController } from '@/presentation/controllers/collection'
import { Controller } from '@/presentation/protocols'

export const makeAddPlatformToCollectionController = (): Controller => new AddPlatformToCollectionController(
  makeDbAddPlatformItem()
)
