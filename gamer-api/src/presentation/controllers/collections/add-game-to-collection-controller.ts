import { type AddItemToCollection } from '@/domain/usecases/collection'
import { NotFound } from '@/presentation/errors'
import { created, notFound, serverError } from '@/presentation/helpers/http'
import { type Controller, type HttpRequest, type HttpResponse } from '@/presentation/protocols'

export class AddGameToCollectionController implements Controller {
  constructor (private readonly addCollection: AddItemToCollection) {}

  async handle ({ body }: HttpRequest): Promise<HttpResponse> {
    try {
      const id = await this.addCollection.add(body)
      if (!id) return notFound(new NotFound('Game'))
      return created({ id })
    } catch (error) {
      return serverError(error)
    }
  }
}
