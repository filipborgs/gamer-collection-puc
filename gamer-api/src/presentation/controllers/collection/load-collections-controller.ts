import { LoadCollections } from '@/domain/usecases/collection'
import { noContent, ok, serverError } from '@/presentation/helpers/http'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'

export class LoadCollectionsController implements Controller {
  constructor (private readonly loadCollections: LoadCollections) {}

  async handle ({ params }: HttpRequest): Promise<HttpResponse> {
    try {
      const { userId } = params
      const collections = await this.loadCollections.load(userId)
      if (!collections) return noContent()
      return ok(collections)
    } catch (error) {
      return serverError(error)
    }
  }
}
