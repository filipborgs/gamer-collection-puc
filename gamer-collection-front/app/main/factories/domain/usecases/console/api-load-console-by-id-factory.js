import { ApiLoadById } from '../../../../../domain/usecases/generic'
import { makeApiUrl, makeAxiosHttpClient } from '../../../infra/http'

export const makeApiLoadConsoleById = () => new ApiLoadById(makeApiUrl('/platforms'), makeAxiosHttpClient())
