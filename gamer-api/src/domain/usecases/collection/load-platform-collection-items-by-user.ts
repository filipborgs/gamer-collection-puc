import { PlatfromCollectionItem } from '@/domain/entities'

export interface LoadPlatformCollectionItemsParams {
  userId: string
}

export interface LoadPlatformCollectionItems {
  loadByUser: (params: LoadPlatformCollectionItemsParams) => Promise<PlatfromCollectionItem[]>
}
