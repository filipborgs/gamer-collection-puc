import { ApiLoadCollectionsByUserId } from '../../../../../domain/usecases/collection/api-load-collections-by-user-id'
import { makeApiUrl, makeAxiosHttpClient } from '../../../infra/http'

export const makeApiLoadCollectionByUserId = () => new ApiLoadCollectionsByUserId(makeApiUrl('/collections/users'), makeAxiosHttpClient())
