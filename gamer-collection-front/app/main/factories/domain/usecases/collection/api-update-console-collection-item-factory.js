import { ApiUpdateCollectionItem } from '../../../../../domain/usecases/generic'
import { makeApiUrl } from '../../../infra/http'
import { makeAuthorizeHttpClientDecorator } from '../../../main/decorators'

export const makeUpdateConsoleCollectionItem = () =>
  new ApiUpdateCollectionItem(
    makeApiUrl('/collections/platforms/items'),
    makeAuthorizeHttpClientDecorator()
  )
