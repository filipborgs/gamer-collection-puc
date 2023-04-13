import { ApiSearchGames } from '../../../../../domain/usecases/game'
import { makeApiUrl, makeAxiosHttpClient } from '../../../infra/http'

export const makeApiSearchGames = () => new ApiSearchGames(makeApiUrl('/games'), makeAxiosHttpClient())
