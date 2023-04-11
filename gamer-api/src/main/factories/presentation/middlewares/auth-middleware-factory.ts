import { AuthMiddleware } from '@/presentation/middlewares/auth-middleware'
import { Middleware } from '@/presentation/protocols/middleware'
import { makeJwtTokenValidation } from '@/main/factories/data/usecases/user'

export const makeAuthMiddleware = (): Middleware => {
  return new AuthMiddleware(makeJwtTokenValidation())
}
