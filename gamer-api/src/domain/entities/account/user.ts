export interface User {
  id: string
  name: string
  email: string
  password: string
}

export interface LoggedUser {
  id: string
  name: string
  token: string
}
