import { AuthMiddleware } from '@/presentation/middlewares/auth-middleware'
import { type Middleware } from '@/presentation/protocols/middleware'
import { makeJwtTokenValidation } from '@/main/factories/data/usecases/users'

export const makeAuthMiddleware = (): Middleware => {
  return new AuthMiddleware(makeJwtTokenValidation())
}
