import { LoadPlatformsGateway } from '@/data/protocols/repo/platforms'
import { LoadResult, PlatformPreview } from '@/domain/entities'
import { LoadPlatformsParams, LoadPlatforms } from '@/domain/usecases/platform'

export class ApiLoadPlatforms implements LoadPlatforms {
  constructor (
    private readonly platformGateway: LoadPlatformsGateway
  ) {}

  async load (query: LoadPlatformsParams): Promise<LoadResult<PlatformPreview>> {
    const { search, offset } = query
    return await this.platformGateway.load(search || '', offset || 0)
  }
}
