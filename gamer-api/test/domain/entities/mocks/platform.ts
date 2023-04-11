import { PlatformCategory, Platform, PlatformPreview } from '@/domain/entities'

export const mockPlatform = (): Platform => ({
  id: 48,
  name: 'PlayStation 4',
  alternativeName: 'PS4',
  abreviation: 'PS4',
  category: PlatformCategory.ARCADE,
  generation: 2
})

export const mockPlatformPreview = (): PlatformPreview => ({
  id: 1,
  name: 'any_name'
})
