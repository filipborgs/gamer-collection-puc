import { DbAddUser } from '@/data/usecases/user'
import { AddUser } from '@/domain/usecases/user'
import { makeBcryptAdapter } from '@/main/factories/infra/criptography'
import { makeUuidAdapter } from '@/main/factories/infra/datatype'
import { makeUserPostgresFactory } from '@/main/factories/infra/repo/postgres/user'

export const makeDbAddUser = (): AddUser => new DbAddUser(makeBcryptAdapter(), makeUserPostgresFactory(), makeUuidAdapter())
