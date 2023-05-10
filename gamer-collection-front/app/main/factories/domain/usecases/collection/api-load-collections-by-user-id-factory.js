import { ApiLoadById } from '../../../../../domain/usecases/generic'
import { makeApiUrl, makeAxiosHttpClient } from '../../../infra/http'

export const makeApiLoadCollectionByUserId = () => new ApiLoadById(makeApiUrl('/collections/users'), makeAxiosHttpClient())
