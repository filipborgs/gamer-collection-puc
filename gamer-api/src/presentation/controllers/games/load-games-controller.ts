import { type LoadGames } from '@/domain/usecases/games'
import { ok, serverError } from '@/presentation/helpers/http'
import { type HttpRequest, type HttpResponse, type Controller } from '@/presentation/protocols'

export class LoadGamesController implements Controller {
  constructor (private readonly loadGames: LoadGames) {}

  async handle ({ query }: HttpRequest): Promise<HttpResponse> {
    const { search, offset } = query
    try {
      const gamesResult = await this.loadGames.load({ offset, search })
      return ok(gamesResult)
    } catch (error) {
      return serverError(error)
    }
  }
}
