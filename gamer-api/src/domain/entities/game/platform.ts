import { PlatformCategory } from '@/domain/entities'

export interface Platform {
  id: number
  name: string
  alternativeName: string
  abbreviation?: string
  category: PlatformCategory
  generation: number
}

export interface PlatformPreview {
  id: number
  name: string
  abbreviation?: string
}
