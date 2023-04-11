import { forbidden, ok, serverError, unauthorized } from '@/presentation/helpers/http'
import { HttpRequest, HttpResponse, Middleware } from '@/presentation/protocols'
import { AccessDeniedError, UnauthorizedError } from '@/presentation/errors'
import { TokenValidation } from '@/domain/usecases/user'

export class AuthMiddleware implements Middleware {
  constructor (
    private readonly jwtDecoder: TokenValidation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const token = httpRequest.headers?.['x-access-token']
      if (token) {
        const user = await this.jwtDecoder.validate(token)
        if (user) {
          return ok({ user })
        }
      }
      return forbidden(new AccessDeniedError())
    } catch (error) {
      if (error instanceof UnauthorizedError) return unauthorized()
      return serverError(error)
    }
  }
}
