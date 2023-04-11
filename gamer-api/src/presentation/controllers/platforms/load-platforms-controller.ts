import { LoadPlatforms } from '@/domain/usecases/platform'
import { ok, serverError } from '@/presentation/helpers/http'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'

export class LoadPlatformsController implements Controller {
  constructor (private readonly loadPlatforms: LoadPlatforms) {}

  async handle ({ query }: HttpRequest): Promise<HttpResponse> {
    try {
      const { search, offset } = query
      const platforms = await this.loadPlatforms.load({ offset: Number(offset), search })
      return ok(platforms)
    } catch (error) {
      return serverError(error)
    }
  }
}
