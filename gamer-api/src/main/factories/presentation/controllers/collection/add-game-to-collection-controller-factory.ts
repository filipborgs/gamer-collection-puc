import { makeDbAddGameItem } from '@/main/factories/data/usecases/collection'
import { AddGameToCollectionController } from '@/presentation/controllers/collection'
import { Controller } from '@/presentation/protocols'

export const makeAddGameToCollectionController = (): Controller => new AddGameToCollectionController(
  makeDbAddGameItem()
)
