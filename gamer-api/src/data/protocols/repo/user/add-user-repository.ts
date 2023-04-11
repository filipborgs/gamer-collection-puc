import { User } from '@/domain/entities'

export interface AddUserRepository {
  add: (data: User) => Promise<void>
}
