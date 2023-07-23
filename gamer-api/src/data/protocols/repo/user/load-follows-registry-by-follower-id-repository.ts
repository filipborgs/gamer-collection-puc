import { FollowerRegistry } from '@/domain/entities'

export interface LoadFollowsRegistryByFollowerIdRepository {
  loadByFollowerId: (id: string) => Promise<FollowerRegistry[]>
}
