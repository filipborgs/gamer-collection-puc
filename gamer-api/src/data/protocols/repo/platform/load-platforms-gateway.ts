import { LoadResult, PlatformPreview } from '@/domain/entities'

export interface LoadPlatformsGateway {
  load: (search: string, offset: number) => Promise<LoadResult<PlatformPreview>>
}
