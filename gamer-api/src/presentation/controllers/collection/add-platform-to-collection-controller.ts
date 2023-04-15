import { AddPlatformItem } from '@/domain/usecases/collection'
import { NotFound } from '@/presentation/errors'
import { created, notFound, serverError } from '@/presentation/helpers/http'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'

export class AddPlatformToCollectionController implements Controller {
  constructor (private readonly addCollection: AddPlatformItem) {}

  async handle ({ body, headers }: HttpRequest): Promise<HttpResponse> {
    const { user } = headers
    try {
      const id = await this.addCollection.add({ ...body, userId: user.id })
      if (!id) return notFound(new NotFound('Platform'))
      return created({ id })
    } catch (error) {
      return serverError(error)
    }
  }
}
