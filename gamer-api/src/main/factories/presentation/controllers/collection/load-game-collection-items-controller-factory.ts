import { makeDbLoadGameCollectionItems } from '@/main/factories/data/usecases/collection'
import { LoadGameCollectionItemController } from '@/presentation/controllers/collection'
import { Controller } from '@/presentation/protocols'

export const makeLoadGameCollectionItemsController = (): Controller => new LoadGameCollectionItemController(
  makeDbLoadGameCollectionItems()
)
