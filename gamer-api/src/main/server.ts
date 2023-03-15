import 'module-alias/register'
import env from '@/main/config/env'

void (async function () {
  const app = (await import('./config/app')).default
  app.listen(env.port, () => { console.log(`Server is running ${env.port}`) })
}())
