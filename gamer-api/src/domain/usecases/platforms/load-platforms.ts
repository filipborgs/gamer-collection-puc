import { type LoadResult, type PlatformPreview } from '@/domain/entities'

export interface LoadPlatformsParams {
  search: string
  offset: number
}

export interface LoadPlatforms {
  load: (query: LoadPlatformsParams) => Promise<LoadResult<PlatformPreview>>
}
