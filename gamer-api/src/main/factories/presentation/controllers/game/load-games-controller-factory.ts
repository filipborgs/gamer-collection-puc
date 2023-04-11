import { makeApiLoadGames } from '@/main/factories/data/usecases/game'
import { LoadGamesController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeLoadGamesController = (): Controller => new LoadGamesController(makeApiLoadGames())
