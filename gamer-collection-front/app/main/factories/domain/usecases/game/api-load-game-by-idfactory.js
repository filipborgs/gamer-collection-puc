import { ApiLoadGameById } from '../../../../../domain/usecases/game/api-load-game-by-id'
import { makeApiUrl, makeAxiosHttpClient } from '../../../infra/http'

export const makeApiLoadGameById = () => new ApiLoadGameById(makeApiUrl('/games'), makeAxiosHttpClient())
