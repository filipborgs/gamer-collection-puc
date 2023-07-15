import { UpdatePlatformCollectionItem } from '@/domain/usecases/collection'
import { conflict, noContent, serverError } from '@/presentation/helpers/http'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'

export class UpdatePlatformCollectionItemController implements Controller {
  constructor (private readonly updatePlatformItem: UpdatePlatformCollectionItem) {}

  async handle ({ body, params, headers }: HttpRequest): Promise<HttpResponse> {
    const { user } = headers
    const { itemId } = params
    try {
      const updated = await this.updatePlatformItem.update({ ...body, id: itemId, userId: user.id })
      if (!updated) return conflict()
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
