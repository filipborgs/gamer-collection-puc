import { Collection } from '@/domain/entities'

export interface LoadCollections {
  load: (userId: string) => Promise<Collection[]>
}
