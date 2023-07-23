import { makeDbLoadFollowsByFollowerId } from '@/main/factories/data/usecases/follow'
import { LoadFollowsByFollowerIdController } from '@/presentation/controllers/follow'
import { Controller } from '@/presentation/protocols'

export const makeLoadFollowsByFollowerIdController = (): Controller => new LoadFollowsByFollowerIdController(
  makeDbLoadFollowsByFollowerId()
)
