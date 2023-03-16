import { type GamePreview, type Game } from '@/domain/entities'

export const mockGame = (): Game => ({
  id: 1,
  name: 'any_name',
  releaseDate: new Date(),
  platforms: [{
    id: 1,
    name: 'any_platform'
  }]
})

export const mockGamePreview = (): GamePreview => ({
  id: 1,
  name: 'any_name',
  platforms: [{
    id: 1,
    name: 'any_platform'
  }]
})