import { PostgresHelper } from '@/infra/repos/postgres/helpers'
import { newDb, type IMemoryDb } from 'pg-mem'

export const makeFakeDb = async (): Promise<{
  db: IMemoryDb
  connection: PostgresHelper
}> => {
  const db = newDb({ autoCreateForeignKeyIndices: true })
  db.public.registerFunction({
    implementation: () => 'test',
    name: 'current_database'
  })
  db.public.registerFunction({
    implementation: () => '16',
    name: 'version'
  })
  const connection = PostgresHelper.getInstance({
    environment: 'test',
    db
  } as any)
  return { db, connection }
}
