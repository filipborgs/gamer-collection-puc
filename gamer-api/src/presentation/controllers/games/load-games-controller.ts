import { type LoadGames } from '@/domain/usecases/games'
import { ok, serverError } from '@/presentation/helpers/http'
import { type HttpRequest, type HttpResponse, type Controller } from '@/presentation/protocols'

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
