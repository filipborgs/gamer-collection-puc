import { type GamePreview, type LoadResult } from '@/domain/entities'

export interface LoadGamesGateway {
  load: (search: string, offset: number) => Promise<LoadResult<GamePreview>>
}
