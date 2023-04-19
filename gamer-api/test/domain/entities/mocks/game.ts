import { GamePreview, Game } from '@/domain/entities'

export const mockGame = (): Game => ({
  id: 1,
  name: 'any_name',
  releaseDate: new Date(),
  cover: {
    code: 'any_code'
  },
  platforms: [{
    id: 1,
    name: 'any_platform',
    abbreviation: 'ap'
  }]
})

export const mockGamePreview = (): GamePreview => ({
  id: 1,
  name: 'any_name',
  cover: {
    code: 'any_code'
  }
})
