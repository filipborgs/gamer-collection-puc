import { User } from '@/domain/entities'

export const mockUser = (): User => ({
  id: '80727abe-7d17-4706-8a90-69817cb90e93',
  name: 'any_name',
  email: 'any_mail@example.com',
  password: 'hashed_password'
})
