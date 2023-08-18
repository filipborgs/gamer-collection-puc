import { ApiLoadById } from '~/app/domain/usecases/generic'
import { makeApiUrl, makeAxiosHttpClient } from '~/app/main/factories/infra/http'

export const makeApiLoadFollowsById = () => new ApiLoadById(makeApiUrl('/follows'), makeAxiosHttpClient())
