import { ApiLoadGamesCollectionItemsById } from '../../../../../domain/usecases/collection'
import { makeApiUrl, makeAxiosHttpClient } from '../../../infra/http'

export const makeApiLoadGamesCollectionItems = () => new ApiLoadGamesCollectionItemsById(makeApiUrl('/collections/users'), makeAxiosHttpClient())
