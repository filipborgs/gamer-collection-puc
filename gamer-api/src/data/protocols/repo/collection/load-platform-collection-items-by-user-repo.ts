import { PlatfromCollectionItem } from '@/domain/entities'

export interface LoadPlatformCollectionItemsRepositoryParams {
  userId: string
}

export interface LoadPlatformCollectionItemsRepository {
  loadByUser: (params: LoadPlatformCollectionItemsRepositoryParams) => Promise<PlatfromCollectionItem[]>
}
