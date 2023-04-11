import { LoadResult, Platform, PlatformPreview } from '@/domain/entities'
import { LoadGamesParams } from '@/domain/usecases/game'
import { mockPlatform, mockPlatformPreview } from '@/test/domain/entities/mocks'

export const mockLoadPlatformById = (): Platform => mockPlatform()

export const mockLoadPlatforms = (): LoadResult<PlatformPreview> => ({
  items: [mockPlatformPreview()],
  limit: 10,
  count: 10,
  offset: 0
})

export const mockLoadPlatformsParams = (): LoadGamesParams => ({
  search: 'any_query',
  offset: 0
})
