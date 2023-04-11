import { type LoadPlatformByIdGateway } from '@/data/protocols/repo/platforms'
import { type Platform } from '@/domain/entities'
import { type LoadPlatformById } from '@/domain/usecases/platform'

export class ApiLoadPlatformById implements LoadPlatformById {
  constructor (private readonly platformGateway: LoadPlatformByIdGateway) {}

  async loadById (id: number): Promise<Platform> {
    return await this.platformGateway.loadById(id)
  }
}
