import { makeApiLoadGameById } from '@/main/factories/data/usecases/games'
import { LoadGameByIdController } from '@/presentation/controllers'
import { type Controller } from '@/presentation/protocols'

export const makeLoadGameByIdController = (): Controller => new LoadGameByIdController(makeApiLoadGameById())
