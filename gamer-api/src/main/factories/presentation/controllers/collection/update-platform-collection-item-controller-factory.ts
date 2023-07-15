import { makeDbUpdatePlatformCollectionItem } from '@/main/factories/data/usecases/collection'
import { UpdatePlatformCollectionItemController } from '@/presentation/controllers/collection'
import { Controller } from '@/presentation/protocols'

export const makeUpdatePlatformCollectionItemController = (): Controller => new UpdatePlatformCollectionItemController(
  makeDbUpdatePlatformCollectionItem()
)
