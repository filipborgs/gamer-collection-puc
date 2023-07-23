import { makeDbFollowUser } from '@/main/factories/data/usecases/follow'
import { FollowUserController } from '@/presentation/controllers/follow'
import { Controller } from '@/presentation/protocols'

export const makeFollowUserController = (): Controller => new FollowUserController(
  makeDbFollowUser()
)
