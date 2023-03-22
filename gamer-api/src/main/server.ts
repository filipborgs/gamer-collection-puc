import 'module-alias/register'
import * as dotenv from 'dotenv'
import { PostgresHelper } from '@/infra/repos/postgres/helpers'
dotenv.config()

void (async function () {
  const env = (await import('./config/env')).default

  PostgresHelper.getInstance(
    {
      database: env.dbDatabase,
      host: env.dbHost,
      password: env.dbPassword,
      port: env.dbPort,
      username: env.dbUserName,
      environment: env.tsNode
    }
  ).connect().then(async () => {
    const app = (await import('./config/app')).default
    app.listen(env.port, () => { console.log(`Server is running ${env.port}`) })
  }).catch(console.error)
}())
