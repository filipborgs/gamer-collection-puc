import { LoadPlatformCollectionItems } from '@/domain/usecases/collection'
import { NotFound } from '@/presentation/errors'
import { notFound, ok, serverError } from '@/presentation/helpers/http'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'

export class LoadPlatformCollectionItemController implements Controller {
  constructor (private readonly loadCollection: LoadPlatformCollectionItems) {}

  async handle ({ params }: HttpRequest): Promise<HttpResponse> {
    try {
      const { userId } = params
      const collections = await this.loadCollection.loadByUser({
        userId
      })
      if (!collections.length) return notFound(new NotFound('Platform collection item'))
      return ok(collections)
    } catch (error) {
      return serverError(error)
    }
  }
}
