import { makeDbAddItemToCollection } from '@/main/factories/data/usecases/collections'
import { AddGameToCollectionController } from '@/presentation/controllers/collections'
import { type Controller } from '@/presentation/protocols'

export const makeAddGameToCollectionController = (): Controller => new AddGameToCollectionController(
  makeDbAddItemToCollection()
)