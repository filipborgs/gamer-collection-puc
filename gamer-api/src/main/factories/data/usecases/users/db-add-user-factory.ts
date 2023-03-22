import { DbAddUser } from '@/data/usecases/users'
import { type AddUser } from '@/domain/usecases/users'
import { makeBcryptAdapter } from '@/main/factories/infra/criptography'
import { makeUuidAdapter } from '@/main/factories/infra/datatype'
import { makeUserPostgresFactory } from '@/main/factories/infra/repo/postgres/users'

export const makeDbAddUser = (): AddUser => new DbAddUser(makeBcryptAdapter(), makeUserPostgresFactory(), makeUuidAdapter())
