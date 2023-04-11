import { type Authentication } from '@/domain/usecases/user'
import { ok, serverError, unauthorized } from '@/presentation/helpers/http'
import { type Controller, type HttpRequest, type HttpResponse } from '@/presentation/protocols'

export class LoginController implements Controller {
  constructor (
    private readonly authentication: Authentication
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { email, password } = httpRequest.body

      const token = await this.authentication.login({ email, password })
      if (!token) return unauthorized()

      return ok({
        token
      })
    } catch (error) {
      return serverError(error)
    }
  }
}
