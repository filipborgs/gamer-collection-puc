import { FollowUser } from '@/domain/usecases/user'
import { noContent, serverError } from '@/presentation/helpers/http'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'

export class FollowUserController implements Controller {
  constructor (private readonly followUser: FollowUser) {}

  async handle ({ body, headers }: HttpRequest): Promise<HttpResponse> {
    const { user } = headers
    try {
      await this.followUser.follow({ ...body, followerId: user.id })
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
