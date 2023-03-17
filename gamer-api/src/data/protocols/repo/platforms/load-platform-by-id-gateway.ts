import { type Platform } from '@/domain/entities'

export interface LoadPlatformByIdGateway {
  loadById: (id: number) => Promise<Platform>
}
