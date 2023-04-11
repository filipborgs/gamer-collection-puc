import { AuthenticationParams } from '@/domain/usecases/user'

export const mockAuthenticationParams = (): AuthenticationParams => ({
  email: 'any_email@mail.com',
  password: 'any_password'
})
