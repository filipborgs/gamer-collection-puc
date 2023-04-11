import { type GamePreview, type LoadResult } from '@/domain/entities'
import { mockGamePreview } from '@/test/domain/entities/mocks'
import { type LoadGamesParams } from '@/domain/usecases/game'

export const mockLoadResultGamePreview = (): LoadResult<GamePreview> => ({
  items: [mockGamePreview()],
  limit: 10,
  count: 10,
  offset: 0
})

export const mockLoadGamesParams = (): LoadGamesParams => ({
  search: 'any_query',
  offset: 0
})
