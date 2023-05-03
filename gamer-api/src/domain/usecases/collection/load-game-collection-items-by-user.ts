import { GameCollectionItem } from '@/domain/entities'

export interface LoadGameCollectionItemsParams {
  userId: string
  platformId: number
}

export interface LoadGameCollectionItems {
  loadByUser: (params: LoadGameCollectionItemsParams) => Promise<GameCollectionItem[]>
}
