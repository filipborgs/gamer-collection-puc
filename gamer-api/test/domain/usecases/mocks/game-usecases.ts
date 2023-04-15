import { Game, GamePreview, LoadResult, PurchaseState } from '@/domain/entities'
import { AddGameItemParams, AddPlatformItemParams } from '@/domain/usecases/collection'
import { LoadGamesParams } from '@/domain/usecases/game'
import { mockGame, mockGamePreview } from '@/test/domain/entities/mocks'

export const mockLoadResultGamePreview = (): LoadResult<GamePreview> => ({
  items: [mockGamePreview()],
  limit: 10,
  count: 10,
  offset: 0
})

export const mockLoadGamesParams = (): LoadGamesParams => ({
  search: 'any_query',
  offset: 0
})

export const mockAddGameItemParams = (): AddGameItemParams => ({
  itemId: 2,
  purchasePrice: 200,
  userId: '80727abe-7d17-4706-8a90-69817cb90e93',
  purchaseState: PurchaseState.USED,
  purchaseDate: new Date()
})

export const mockAddPlatformItemParams = (): AddPlatformItemParams => ({
  itemId: 2,
  purchasePrice: 200,
  userId: '80727abe-7d17-4706-8a90-69817cb90e93',
  purchaseState: PurchaseState.USED,
  purchaseDate: new Date(),
  box: true,
  cables: true,
  joysticks: 4,
  manual: false,
  sealed: false
})

export const mockLoadGameById = (): Game => mockGame()
