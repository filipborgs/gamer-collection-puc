import { adaptMiddleware } from '@/main/adapters'
import { makeAuthMiddleware } from '@/main/factories/presentation/middlewares'

export const auth = adaptMiddleware(makeAuthMiddleware())
