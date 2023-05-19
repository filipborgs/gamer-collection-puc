import { makeDbRemoveGameCollectionItem } from '@/main/factories/data/usecases/collection'
import { RemoveCollectionItemController } from '@/presentation/controllers/collection'
import { Controller } from '@/presentation/protocols'

export const makeRemoveGameCollectionItemController = (): Controller => new RemoveCollectionItemController(
  makeDbRemoveGameCollectionItem()
)
