import { GameCollectionItem } from '@/domain/entities'

export interface LoadGameCollectionItemsRepositoryParams {
  userId: string
  platformId: number
}

export interface LoadGameCollectionItemsRepository {
  loadByUser: (params: LoadGameCollectionItemsRepositoryParams) => Promise<GameCollectionItem[]>
}
