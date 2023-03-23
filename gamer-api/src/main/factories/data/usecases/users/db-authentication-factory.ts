import { DbAuthentication } from '@/data/usecases/users'
import { type Authentication } from '@/domain/usecases/users'
import { makeBcryptAdapter, makeJsonWebTokenAdapter } from '@/main/factories/infra/criptography'
import { makeUserPostgresFactory } from '@/main/factories/infra/repo/postgres/users'

export const makeDbAuthentication = (): Authentication =>
  new DbAuthentication(
    makeUserPostgresFactory(),
    makeBcryptAdapter(),
    makeJsonWebTokenAdapter()
  )
