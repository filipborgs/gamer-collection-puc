import { makeDbAuthentication } from '@/main/factories/data/usecases/user'
import { LoginController } from '@/presentation/controllers/login'
import { Controller } from '@/presentation/protocols'

export const makeLoginController = (): Controller => new LoginController(makeDbAuthentication())
