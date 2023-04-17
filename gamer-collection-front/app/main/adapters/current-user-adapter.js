import { makeLocalStorageAdapter } from "../factories/infra/cache"

export const setCurrentUserAdapter = (user) => {
  makeLocalStorageAdapter().set('user', user)
}

export const getCurrentUserAdapter = () => {
  return makeLocalStorageAdapter().get('user')
}
