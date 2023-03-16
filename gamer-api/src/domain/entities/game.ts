export interface Game {
  id: number
  name: string
  releaseDate: Date
  cover?: Cover
  platforms: Array<{
    id: number
    name: string
  }>
}

export interface Cover { code: string }

export interface GamePreview {
  id: number
  name: string
  cover: Cover
}
