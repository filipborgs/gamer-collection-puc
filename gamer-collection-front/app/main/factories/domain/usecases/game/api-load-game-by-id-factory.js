import { ApiLoadById } from '../../../../../domain/usecases/generic'
import { makeApiUrl, makeAxiosHttpClient } from '../../../infra/http'

export const makeApiLoadGameById = () => new ApiLoadById(makeApiUrl('/games'), makeAxiosHttpClient())
