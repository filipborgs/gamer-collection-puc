export interface Game {
  id: number
  name: string
  releaseDate: Date
  platforms: Array<{
    id: number
    name: string
  }>
}

export interface GamePreview {
  id: number
  name: string
  platforms: Array<{
    id: number
    name: string
  }>
}
