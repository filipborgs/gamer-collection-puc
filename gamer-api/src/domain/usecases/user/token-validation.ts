import { type User } from '@/domain/entities'

export interface TokenValidation {
  validate: (token: string) => Promise<User>
}
