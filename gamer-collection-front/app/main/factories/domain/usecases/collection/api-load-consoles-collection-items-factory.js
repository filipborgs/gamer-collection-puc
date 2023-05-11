import { ApiLoadConsoleCollectionItemsById } from '../../../../../domain/usecases/collection/api-load-console-collection-items'
import { makeApiUrl, makeAxiosHttpClient } from '../../../infra/http'

export const makeApiLoadConsoleCollectionItems = () => new ApiLoadConsoleCollectionItemsById(makeApiUrl('/collections/users'), makeAxiosHttpClient())
