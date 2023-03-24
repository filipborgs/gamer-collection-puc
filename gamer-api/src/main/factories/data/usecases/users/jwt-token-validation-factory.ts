import { JwtTokenValidation } from '@/data/usecases/users'
import { type TokenValidation } from '@/domain/usecases/users'
import { makeJsonWebTokenAdapter } from '@/main/factories/infra/criptography'

export const makeJwtTokenValidation = (): TokenValidation =>
  new JwtTokenValidation(
    makeJsonWebTokenAdapter()
  )
