import 'module-alias/register'
import { IgdbHelper } from '@/infra/api/games/helpers'
import env from '@/main/config/env'

void IgdbHelper.connect(env.clientId, env.token).then(async () => {
  const app = (await import('./config/app')).default
  app.listen(env.port, () => { console.log(`Server is running ${env.port}`) })
})
