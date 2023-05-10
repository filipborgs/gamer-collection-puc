import { Authentication } from '@/domain/usecases/user'
import { ok, serverError, unauthorized } from '@/presentation/helpers/http'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'

export class LoginController implements Controller {
  constructor (
    private readonly authentication: Authentication
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { email, password } = httpRequest.body

      const loggedUser = await this.authentication.login({ email, password })
      if (!loggedUser) return unauthorized()

      return ok(loggedUser)
    } catch (error) {
      return serverError(error)
    }
  }
}
