export interface LoadResult<T = any> {
  items: T[]
  offset: number
  count: number
  limit: number
}
