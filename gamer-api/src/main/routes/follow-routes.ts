/* eslint-disable @typescript-eslint/no-misused-promises */
import { adaptRoute } from '@/main/adapters'
import { Router } from 'express'

import { auth } from '@/main/middlewares'
import { makeFollowUserController, makeLoadFollowsByFollowerIdController } from '../factories/presentation/controllers/follow'

export default (router: Router): void => {
  router.get('/follows/:followerId', adaptRoute(makeLoadFollowsByFollowerIdController()))
  router.post('/follows', auth, adaptRoute(makeFollowUserController()))
}
