import { AuthorizeHttpClientDecorator } from '../../../decorators'
import { makeLocalStorageAdapter } from '../../infra/cache'
import { makeAxiosHttpClient } from '../../infra/http'

export const makeAuthorizeHttpClientDecorator = () =>
  new AuthorizeHttpClientDecorator(
    makeLocalStorageAdapter(),
    makeAxiosHttpClient()
  )
