import { makeDbAddUser } from '@/main/factories/data/usecases/users'
import { SingUpController } from '@/presentation/controllers/login'
import { Controller } from '@/presentation/protocols'

export const makeSignupController = (): Controller => new SingUpController(makeDbAddUser())
