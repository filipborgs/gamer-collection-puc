import { makeLocalStorageAdapter } from "../factories/infra/browser"

export const setCurrentUserAdapter = (user) => {
  const storage = makeLocalStorageAdapter()
  if(user){
    storage.set('user', user)
    storage.set('login_time', new Date())
  }else {
    storage.clear()
  }
}

export const getCurrentUserAdapter = () => {
  return makeLocalStorageAdapter().get('user')
}

export const getLoginTimeAdapter = () => {
  const time = makeLocalStorageAdapter().get('login_time')
  if(!time) return null
  return new Date(time)
}

export const getTokenTimerAdapter = () => {
  const date = getLoginTimeAdapter()
  if(!date) return null
  return new Date() - date
}
