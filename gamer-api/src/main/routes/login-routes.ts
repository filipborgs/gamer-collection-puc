/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { adaptRoute } from '@/main/adapters'
import { makeLoginController, makeSignupController } from '@/main/factories/presentation/controllers/login'

export default (router: Router): void => {
  router.post('/singup', adaptRoute(makeSignupController()))
  router.post('/login', adaptRoute(makeLoginController()))
}
