import { type AddUserParams } from '@/domain/usecases/users'

export const mockAddUserParams = (): AddUserParams => ({
  name: 'any_name',
  email: 'any_email',
  password: 'any_password'
})
