import { UpdateGameCollectionItem } from '@/domain/usecases/collection'
import { conflict, noContent, serverError } from '@/presentation/helpers/http'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'

export class UpdateGameCollectionItemController implements Controller {
  constructor (private readonly updateGameItem: UpdateGameCollectionItem) {}

  async handle ({ body, headers }: HttpRequest): Promise<HttpResponse> {
    const { user } = headers
    try {
      const updated = await this.updateGameItem.update({ ...body, userId: user.id })
      if (!updated) return conflict()
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
