/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { adaptRoute } from '@/main/adapters'
import { makeLoadGameByIdController, makeLoadGamesController } from '@/main/factories/presentation/controllers/games'

export default (router: Router): void => {
  router.get('/games', adaptRoute(makeLoadGamesController()))
  router.get('/games/:gameId', adaptRoute(makeLoadGameByIdController()))
}
