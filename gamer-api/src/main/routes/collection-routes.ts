/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { adaptRoute } from '@/main/adapters'
import { makeAddGameToCollectionController, makeAddPlatformToCollectionController } from '@/main/factories/presentation/controllers/collection'

import { auth } from '@/main/middlewares'

export default (router: Router): void => {
  router.post('/collections/games', auth, adaptRoute(makeAddGameToCollectionController()))
  router.post('/collections/platforms', auth, adaptRoute(makeAddPlatformToCollectionController()))
}
