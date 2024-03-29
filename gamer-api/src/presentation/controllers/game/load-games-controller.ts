import { LoadGames } from '@/domain/usecases/game'
import { ok, serverError } from '@/presentation/helpers/http'
import { HttpRequest, HttpResponse, Controller } from '@/presentation/protocols'

export class LoadGamesController implements Controller {
  constructor (private readonly loadGames: LoadGames) {}

  async handle ({ query }: HttpRequest): Promise<HttpResponse> {
    try {
      const { search, offset } = query
      const gamesResult = await this.loadGames.load({ offset: Number(offset), search })
      return ok(gamesResult)
    } catch (error) {
      return serverError(error)
    }
  }
}
