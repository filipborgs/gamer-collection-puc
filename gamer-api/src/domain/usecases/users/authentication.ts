export interface AuthenticationParams {
  email: string
  password: string
}

export interface Authentication {
  login: (authentication: AuthenticationParams) => Promise<string | null>
}
