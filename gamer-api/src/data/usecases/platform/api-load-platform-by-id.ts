import { LoadPlatformByIdGateway } from '@/data/protocols/repo/platform'
import { Platform } from '@/domain/entities'
import { LoadPlatformById } from '@/domain/usecases/platform'

export class ApiLoadPlatformById implements LoadPlatformById {
  constructor (private readonly platformGateway: LoadPlatformByIdGateway) {}

  async loadById (id: number): Promise<Platform> {
    return await this.platformGateway.loadById(id)
  }
}
