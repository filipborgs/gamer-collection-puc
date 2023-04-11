import { type LoadPlatformsGateway } from '@/data/protocols/repo/platforms'
import { type LoadResult, type PlatformPreview } from '@/domain/entities'
import { type LoadPlatformsParams, type LoadPlatforms } from '@/domain/usecases/platform'

export class ApiLoadPlatforms implements LoadPlatforms {
  constructor (
    private readonly platformGateway: LoadPlatformsGateway
  ) {}

  async load (query: LoadPlatformsParams): Promise<LoadResult<PlatformPreview>> {
    const { search, offset } = query
    return await this.platformGateway.load(search || '', offset || 0)
  }
}
