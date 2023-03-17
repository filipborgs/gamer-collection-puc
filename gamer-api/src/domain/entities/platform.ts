import { type PlatformCategory } from '@/domain/entities'

export interface Platform {
  id: number
  name: string
  alternativeName: string
  abreviation: string
  releaseDate: Date
  category: PlatformCategory
  generation: number
}

export interface PlatformPreview {
  id: number
  name: string
}
