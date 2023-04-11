import { LoadPlatformById } from '@/domain/usecases/platform'
import { NotFound } from '@/presentation/errors'
import { notFound, ok, serverError } from '@/presentation/helpers/http'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'

export class LoadPlatformByIdController implements Controller {
  constructor (private readonly loadPlatform: LoadPlatformById) {}

  async handle ({ params }: HttpRequest): Promise<HttpResponse> {
    try {
      const { platformId } = params
      const platform = await this.loadPlatform.loadById(Number(platformId))
      if (!platform) return notFound(new NotFound('Platform'))
      return ok(platform)
    } catch (error) {
      return serverError(error)
    }
  }
}
