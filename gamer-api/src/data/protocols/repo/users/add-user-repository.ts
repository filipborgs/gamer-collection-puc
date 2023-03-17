import { type User } from '@/domain/entities'
import { type AddUserParams } from '@/domain/usecases/users'

export interface AddUserRepository {
  add: (data: AddUserParams) => Promise<User>
}
