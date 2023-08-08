import { AuthorizeHttpClientDecorator } from '../../../decorators'
import { makeLocalStorageAdapter, makeRouterAdapter } from '../../infra/browser'
import { makeAxiosHttpClient } from '../../infra/http'

export const makeAuthorizeHttpClientDecorator = () =>
  new AuthorizeHttpClientDecorator(
    makeLocalStorageAdapter(),
    makeAxiosHttpClient(),
    makeRouterAdapter()
  )
