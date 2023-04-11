import { type LoadGameByIdGateway } from '@/data/protocols/repo/games'
import { type Game } from '@/domain/entities'
import { type LoadGameById } from '@/domain/usecases/game'

export class ApiLoadGameById implements LoadGameById {
  constructor (private readonly loadGameGateway: LoadGameByIdGateway) {}

  async loadById (id: number): Promise<Game> {
    const game = await this.loadGameGateway.loadById(id)
    return game
  }
}
