import { type LoadPlatformById } from '@/domain/usecases/platforms'
import { NotFound } from '@/presentation/errors'
import { notFound, ok, serverError } from '@/presentation/helpers/http'
import { type Controller, type HttpRequest, type HttpResponse } from '@/presentation/protocols'

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
