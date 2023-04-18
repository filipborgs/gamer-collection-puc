import { ApiAddCollectionItem } from '../../../../../domain/usecases/generic/api-add-collection-item'
import { makeApiUrl } from '../../../infra/http'
import { makeAuthorizeHttpClientDecorator } from '../../../main/decorators'

export const makeAddGameCollectionItem = () =>
  new ApiAddCollectionItem(
    makeApiUrl('/collections/games'),
    makeAuthorizeHttpClientDecorator()
  )
