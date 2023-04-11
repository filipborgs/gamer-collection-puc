import { makeDbAuthentication } from '@/main/factories/data/usecases/users'
import { LoginController } from '@/presentation/controllers/login'
import { Controller } from '@/presentation/protocols'

export const makeLoginController = (): Controller => new LoginController(makeDbAuthentication())
