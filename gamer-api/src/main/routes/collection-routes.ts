/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { adaptRoute } from '@/main/adapters'
import { makeAddGameToCollectionController, makeAddPlatformToCollectionController, makeLoadCollectionsController, makeLoadGameCollectionItemsController, makeLoadPlatformCollectionItemsController } from '@/main/factories/presentation/controllers/collection'

import { auth } from '@/main/middlewares'

export default (router: Router): void => {
  router.get('/collections/users/:userId', adaptRoute(makeLoadCollectionsController()))
  router.get('/collections/users/:userId/platforms', adaptRoute(makeLoadPlatformCollectionItemsController()))
  router.get('/collections/users/:userId/games', adaptRoute(makeLoadGameCollectionItemsController()))
  router.post('/collections/games', auth, adaptRoute(makeAddGameToCollectionController()))
  router.post('/collections/platforms', auth, adaptRoute(makeAddPlatformToCollectionController()))
}
