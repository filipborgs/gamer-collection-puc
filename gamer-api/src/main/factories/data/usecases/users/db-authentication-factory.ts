import { DbAuthentication } from '@/data/usecases/user'
import { Authentication } from '@/domain/usecases/user'
import { makeBcryptAdapter, makeJsonWebTokenAdapter } from '@/main/factories/infra/criptography'
import { makeUserPostgresFactory } from '@/main/factories/infra/repo/postgres/users'

export const makeDbAuthentication = (): Authentication =>
  new DbAuthentication(
    makeUserPostgresFactory(),
    makeBcryptAdapter(),
    makeJsonWebTokenAdapter()
  )
