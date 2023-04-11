import { Game } from '@/domain/entities'

export interface LoadGameByIdGateway {
  loadById: (id: number) => Promise<Game>
}
