import { ApiSearch } from '../../../../../domain/usecases/generic'
import { makeApiUrl, makeAxiosHttpClient } from '../../../infra/http'

export const makeApiSearchConsoles = () => new ApiSearch(makeApiUrl('/platforms'), makeAxiosHttpClient())
