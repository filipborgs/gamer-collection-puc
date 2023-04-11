import { Platform } from '@/domain/entities'

export interface LoadPlatformById {
  loadById: (id: number) => Promise<Platform>
}
