import { makeDbUpdateGameCollectionItem } from '@/main/factories/data/usecases/collection'
import { UpdateGameCollectionItemController } from '@/presentation/controllers/collection'
import { Controller } from '@/presentation/protocols'

export const makeUpdateGameCollectionItemController = (): Controller => new UpdateGameCollectionItemController(
  makeDbUpdateGameCollectionItem()
)
