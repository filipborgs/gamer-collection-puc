import { type Game } from '@/domain/entities'

export interface LoadGameById {
  loadById: (id: number) => Promise<Game>
}
