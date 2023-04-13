import { ApiAuthentication } from '../../../../../domain/usecases/user'
import { makeApiUrl, makeAxiosHttpClient } from '../../../infra/http'

export const makeApiAuthentication = () =>
  new ApiAuthentication(makeApiUrl('/login'), makeAxiosHttpClient())
