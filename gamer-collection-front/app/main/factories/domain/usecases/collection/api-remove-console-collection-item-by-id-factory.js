import { ApiRemoveCollectionItemById } from '../../../../../domain/usecases/generic'
import { makeApiUrl } from '../../../infra/http'
import { makeAuthorizeHttpClientDecorator } from '../../../main/decorators'

export const makeApiRemoveConsoleCollectionItemById = () =>
  new ApiRemoveCollectionItemById(
    makeApiUrl('/collections/platforms/items'),
    makeAuthorizeHttpClientDecorator()
  )
