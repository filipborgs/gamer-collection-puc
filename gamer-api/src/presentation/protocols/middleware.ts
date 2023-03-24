import { type HttpRequest, type HttpResponse } from './http'

export interface Middleware {
  handle: (httpRequest: HttpRequest) => Promise<HttpResponse>
}
