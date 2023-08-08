import { makeLocalStorageAdapter } from "../factories/infra/browser"

export const setCurrentUserAdapter = (user) => {
  makeLocalStorageAdapter().set('user', user)
}

export const getCurrentUserAdapter = () => {
  return makeLocalStorageAdapter().get('user')
}
