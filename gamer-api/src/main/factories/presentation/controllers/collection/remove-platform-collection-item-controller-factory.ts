import { makeDbRemovePlatformCollectionItem } from '@/main/factories/data/usecases/collection'
import { RemoveCollectionItemController } from '@/presentation/controllers/collection'
import { Controller } from '@/presentation/protocols'

export const makeRemovePlatformCollectionItemController = (): Controller => new RemoveCollectionItemController(
  makeDbRemovePlatformCollectionItem()
)
