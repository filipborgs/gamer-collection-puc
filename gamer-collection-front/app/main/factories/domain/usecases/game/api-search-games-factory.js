import { ApiSearch } from '../../../../../domain/usecases/generic'
import { makeApiUrl, makeAxiosHttpClient } from '../../../infra/http'

export const makeApiSearchGames = () => new ApiSearch(makeApiUrl('/games'), makeAxiosHttpClient())
