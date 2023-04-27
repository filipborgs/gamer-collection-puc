import { ApiSingUp } from '../../../../../domain/usecases/user'
import { makeApiUrl, makeAxiosHttpClient } from '../../../infra/http'

export const makeApiSingup = () =>
  new ApiSingUp(makeApiUrl('/singup'), makeAxiosHttpClient())
