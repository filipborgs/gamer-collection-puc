import { LoadGamesGateway } from '@/data/protocols/repo/game'
import { GamePreview, LoadResult } from '@/domain/entities'
import { LoadGames, LoadGamesParams } from '@/domain/usecases/game'

export class ApiLoadGames implements LoadGames {
  constructor (private readonly apiLoadGames: LoadGamesGateway) {}

  async load (query: LoadGamesParams): Promise<LoadResult<GamePreview>> {
    const { search, offset } = query
    return await this.apiLoadGames.load(search || '', offset || 0)
  }
}
