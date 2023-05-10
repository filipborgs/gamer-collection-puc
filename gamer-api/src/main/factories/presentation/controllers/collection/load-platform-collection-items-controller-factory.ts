import { makeDbLoadPlatformCollectionItems } from '@/main/factories/data/usecases/collection'
import { LoadPlatformCollectionItemController } from '@/presentation/controllers/collection'
import { Controller } from '@/presentation/protocols'

export const makeLoadPlatformCollectionItemsController = (): Controller => new LoadPlatformCollectionItemController(
  makeDbLoadPlatformCollectionItems()
)
