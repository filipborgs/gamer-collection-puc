import { type AddUser } from '@/domain/usecases/user'
import { AlreadyInUseError, InvalidParamError } from '@/presentation/errors'
import { badRequest, created, forbidden, serverError } from '@/presentation/helpers/http'
import { type HttpRequest, type Controller, type HttpResponse } from '@/presentation/protocols'

export class SingUpController implements Controller {
  constructor (
    private readonly addAccount: AddUser
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { name, email, password, passwordConfirmation } = httpRequest.body
      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('password confirmation'))
      }

      const id = await this.addAccount.add({ name, email, password })
      if (!id) return forbidden(new AlreadyInUseError('email'))

      return created({ id })
    } catch (error) {
      return serverError(error)
    }
  }
}
