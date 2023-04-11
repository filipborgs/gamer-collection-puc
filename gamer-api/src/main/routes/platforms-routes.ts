/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { adaptRoute } from '@/main/adapters'
import { makeLoadPlatformByIdController, makeLoadPlatformsController } from '@/main/factories/presentation/controllers/platform'

export default (router: Router): void => {
  router.get('/platforms', adaptRoute(makeLoadPlatformsController()))
  router.get('/platforms/:platformId', adaptRoute(makeLoadPlatformByIdController()))
}
