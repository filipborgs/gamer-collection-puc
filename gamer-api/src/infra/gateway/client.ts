export interface HttpClient {
  post: <T = any> (input: HttpClientParams) => Promise<T>
}

export interface HttpClientParams {
  url: string
  data?: any
  headers: object
}
