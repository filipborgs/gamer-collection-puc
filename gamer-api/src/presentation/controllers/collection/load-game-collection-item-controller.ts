import { LoadGameCollectionItems } from '@/domain/usecases/collection'
import { noContent, ok, serverError } from '@/presentation/helpers/http'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'

export class LoadGameCollectionItemController implements Controller {
  constructor (private readonly loadCollection: LoadGameCollectionItems) {}

  async handle ({ params, query }: HttpRequest): Promise<HttpResponse> {
    try {
      const { userId } = params
      const { platformId } = query
      const collections = await this.loadCollection.loadByUser({
        platformId,
        userId
      })
      if (!collections.length) return noContent()
      return ok(collections)
    } catch (error) {
      return serverError(error)
    }
  }
}
