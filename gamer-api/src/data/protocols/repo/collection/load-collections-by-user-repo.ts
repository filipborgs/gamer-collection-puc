import { Collection } from '@/domain/entities'

export interface LoadCollectionsByUserRepo {
  loadByUser: (userId: string) => Promise<Collection[]>
}
