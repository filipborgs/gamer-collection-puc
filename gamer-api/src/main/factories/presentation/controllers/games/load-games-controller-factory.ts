import { makeApiLoadGames } from '@/main/factories/data/usecases/games'
import { LoadGamesController } from '@/presentation/controllers'
import { type Controller } from '@/presentation/protocols'

export const makeLoadGamesController = (): Controller => new LoadGamesController(makeApiLoadGames())
