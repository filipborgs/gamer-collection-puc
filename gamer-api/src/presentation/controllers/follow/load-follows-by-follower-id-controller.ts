import { LoadFollowsByFollowerId } from '@/domain/usecases/user'
import { NotFound } from '@/presentation/errors'
import { notFound, ok, serverError } from '@/presentation/helpers/http'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'

export class LoadFollowsByFollowerIdController implements Controller {
  constructor (private readonly loadFollows: LoadFollowsByFollowerId) {}

  async handle ({ params }: HttpRequest): Promise<HttpResponse> {
    try {
      const { followerId } = params
      const follows = await this.loadFollows.loadFollows({
        followerId
      })
      if (!follows) return notFound(new NotFound('Follows'))
      return ok(follows)
    } catch (error) {
      return serverError(error)
    }
  }
}
