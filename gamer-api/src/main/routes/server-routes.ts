/* eslint-disable @typescript-eslint/no-misused-promises */
import { PostgresHelper } from '@/infra/repos/postgres/helpers'
import { Router } from 'express'
import env from '@/main/config/env'

export default (router: Router): void => {
  router.get('/check', (_, res) => {
    const dbConnection = PostgresHelper.getInstance().isConnected()
    res.json({
      dbConnection,
      version: env.version
    })
  })
}
