import { LoadGameById } from '@/domain/usecases/game'
import { NotFound } from '@/presentation/errors'
import { notFound, ok, serverError } from '@/presentation/helpers/http'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'

export class LoadGameByIdController implements Controller {
  constructor (private readonly loadGame: LoadGameById) {}

  async handle ({ params }: HttpRequest): Promise<HttpResponse> {
    try {
      const { gameId } = params
      const game = await this.loadGame.loadById(Number(gameId))
      if (!game) return notFound(new NotFound('Game'))
      return ok(game)
    } catch (error) {
      return serverError(error)
    }
  }
}
