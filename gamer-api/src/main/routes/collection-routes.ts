/* eslint-disable @typescript-eslint/no-misused-promises */
import { type Router } from 'express'
import { adaptRoute } from '@/main/adapters'
import { makeAddGameToCollectionController } from '../factories/presentation/controllers/collections'
import { auth } from '@/main/middlewares'

export default (router: Router): void => {
  router.post('/collections/games', auth, adaptRoute(makeAddGameToCollectionController()))
}