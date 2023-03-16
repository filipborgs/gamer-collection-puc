/* eslint-disable @typescript-eslint/no-misused-promises */
import { type Router } from 'express'
import { adaptRoute } from '../adapters'
import { makeLoadGamesController } from '@/main/factories/presentation/controllers/games'

export default (router: Router): void => {
  router.get('/games', adaptRoute(makeLoadGamesController()))
}