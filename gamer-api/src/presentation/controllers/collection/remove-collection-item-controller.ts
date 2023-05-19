import { RemoveCollectionItem } from '@/domain/usecases/collection'
import { noContent, serverError } from '@/presentation/helpers/http'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'

export class RemoveCollectionItemController implements Controller {
  constructor (private readonly removeItem: RemoveCollectionItem) {}

  async handle ({ params }: HttpRequest): Promise<HttpResponse> {
    try {
      const { itemId } = params
      await this.removeItem.remove(itemId)
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
