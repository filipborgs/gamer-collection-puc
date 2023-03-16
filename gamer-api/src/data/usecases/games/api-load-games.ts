import { type LoadGamesGateway } from '@/data/protocols/api/games'
import { type GamePreview, type LoadResult } from '@/domain/entities'
import { type LoadGames, type LoadGamesParams } from '@/domain/usecases/games'

export class ApiLoadGames implements LoadGames {
  constructor (private readonly apiLoadGames: LoadGamesGateway) {}

  async load (query: LoadGamesParams): Promise<LoadResult<GamePreview>> {
    const { search, offset } = query
    return await this.apiLoadGames.load(search || '', offset || 0)
  }
}
