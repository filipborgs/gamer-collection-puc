import { JwtTokenValidation } from '@/data/usecases/user'
import { TokenValidation } from '@/domain/usecases/user'
import { makeJsonWebTokenAdapter } from '@/main/factories/infra/criptography'

export const makeJwtTokenValidation = (): TokenValidation =>
  new JwtTokenValidation(
    makeJsonWebTokenAdapter()
  )
