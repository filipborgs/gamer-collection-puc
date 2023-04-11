import { makeDbAddGameItem } from '@/main/factories/data/usecases/collections'
import { AddGameToCollectionController } from '@/presentation/controllers/collections'
import { Controller } from '@/presentation/protocols'

export const makeAddGameToCollectionController = (): Controller => new AddGameToCollectionController(
  makeDbAddGameItem()
)
