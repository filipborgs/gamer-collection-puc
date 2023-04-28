import { makeDbLoadCollection } from '@/main/factories/data/usecases/collection'
import { LoadCollectionsController } from '@/presentation/controllers/collection'
import { Controller } from '@/presentation/protocols'

export const makeLoadCollectionsController = (): Controller => new LoadCollectionsController(
  makeDbLoadCollection()
)
