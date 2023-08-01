import { ApiRemoveCollectionItemById } from '../../../../../domain/usecases/generic'
import { makeApiUrl } from '../../../infra/http'
import { makeAuthorizeHttpClientDecorator } from '../../../main/decorators'

export const makeApiRemoveGameCollectionItemById = () =>
  new ApiRemoveCollectionItemById(
    makeApiUrl('/collections/games/items'),
    makeAuthorizeHttpClientDecorator()
  )
