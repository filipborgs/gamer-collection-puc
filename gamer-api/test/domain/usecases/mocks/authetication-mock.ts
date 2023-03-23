import { type AuthenticationParams } from '@/domain/usecases/users'

export const mockAuthenticationParams = (): AuthenticationParams => ({
  email: 'any_email@mail.com',
  password: 'any_password'
})
