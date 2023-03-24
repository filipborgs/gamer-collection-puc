export interface HttpResponse {
  statusCode: number
  body?: any
}

export interface HttpRequest {
  headers?: object
  params?: any
  query?: any
  body?: any
}
