import { AddUserParams, AuthenticationParams } from '@/domain/usecases/user'

export const mockAuthenticationParams = (): AuthenticationParams => ({
  email: 'any_email@mail.com',
  password: 'any_password'
})

export const mockAddUserParams = (): AddUserParams => ({
  name: 'any_name',
  email: 'any_email',
  password: 'any_password'
})
