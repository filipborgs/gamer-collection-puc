import { type LoadResult, type PlatformPreview } from '@/domain/entities'

export interface LoadPlatformsGateway {
  load: (search: string, offset: number) => Promise<LoadResult<PlatformPreview>>
}
