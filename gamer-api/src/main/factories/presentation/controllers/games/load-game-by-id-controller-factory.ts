import { makeApiLoadGameById } from '@/main/factories/data/usecases/games'
import { LoadGameByIdController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeLoadGameByIdController = (): Controller => new LoadGameByIdController(makeApiLoadGameById())
