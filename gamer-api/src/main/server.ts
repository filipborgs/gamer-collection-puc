import 'module-alias/register'
import * as dotenv from 'dotenv'
dotenv.config()

void (async function () {
  const app = (await import('./config/app')).default
  const env = (await import('./config/env')).default
  app.listen(env.port, () => { console.log(`Server is running ${env.port}`) })
}())
