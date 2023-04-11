import { User } from '@/domain/entities'

export interface LoadUserByEmailRepository {
  loadByEmail: (email: string) => Promise<User>
}
