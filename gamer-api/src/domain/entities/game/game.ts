import { PlatformPreview, Cover } from '@/domain/entities'

export interface Game {
  id: number
  name: string
  releaseDate: Date
  cover?: Cover
  platforms: PlatformPreview[]
}

export interface GamePreview {
  id: number
  name: string
  cover?: Cover
}
