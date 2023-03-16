import { type GamePreview, type LoadResult } from '@/domain/entities'
import { mockGamePreview } from '@/test/domain/entities/mocks'
import { type LoadGamesParams } from '@/domain/usecases/games'

export const mockLoadPlatforms = (): LoadResult<GamePreview> => ({
  items: [mockGamePreview()],
  limit: 10,
  count: 10,
  offset: 0
})

export const mockLoadPlatformsParams = (): LoadGamesParams => ({
  search: 'any_query',
  offset: 0
})
