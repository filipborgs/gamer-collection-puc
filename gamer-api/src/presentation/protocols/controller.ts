import { type HttpResponse, type HttpRequest } from '@/presentation/protocols'

export interface Controller {
  handle: (request: HttpRequest) => Promise<HttpResponse>
}
