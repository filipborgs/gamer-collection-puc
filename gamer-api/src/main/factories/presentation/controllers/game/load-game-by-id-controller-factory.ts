import { makeApiLoadGameById } from '@/main/factories/data/usecases/game'
import { LoadGameByIdController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeLoadGameByIdController = (): Controller => new LoadGameByIdController(makeApiLoadGameById())
