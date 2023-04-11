import { GamePreview, LoadResult } from '@/domain/entities'

export interface LoadGamesParams {
  search: string
  offset: number
}

export interface LoadGames {
  load: (query: LoadGamesParams) => Promise<LoadResult<GamePreview>>
}
