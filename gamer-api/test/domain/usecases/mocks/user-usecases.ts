import { LoggedUser } from '@/domain/entities'
import { AddUserParams, AuthenticationParams } from '@/domain/usecases/user'
import { mockLoggedUser } from '@/test/domain/entities/mocks'

export const mockAuthenticationParams = (): AuthenticationParams => ({
  email: 'any_email@mail.com',
  password: 'any_password'
})

export const mockAddUserParams = (): AddUserParams => ({
  name: 'any_name',
  email: 'any_email',
  password: 'any_password'
})

export const mockAuthentication = (): LoggedUser => mockLoggedUser()
