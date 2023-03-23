import { JsonWebTokenAdapter } from '@/infra/criptography'
import env from '@/main/config/env'

export const makeJsonWebTokenAdapter = (): JsonWebTokenAdapter =>
  new JsonWebTokenAdapter(env.jwtPrivateKey, env.jwtExpiresIn)
