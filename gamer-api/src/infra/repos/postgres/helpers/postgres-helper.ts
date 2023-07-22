import { DataSource, ObjectType, Repository } from 'typeorm'

interface DbCredentials {
  host: string
  port: number
  username: string
  password: string
  database: string
  environment: string
  db?: any
}
export class PostgresHelper {
  private static instance?: PostgresHelper
  private readonly connection?: DataSource

  private constructor (env: DbCredentials) {
    const { host, port, username, password, database, environment, db } = env
    if (environment === 'test') {
      this.connection = db.adapters.createTypeormDataSource({
        type: 'postgres',
        logging: true,
        db: 'test',
        entities: ['src/infra/repos/postgres/entities/index.ts'],
        migrations: ['src/infra/repos/postgres/migrations/*.ts']
      })
    } else {
      this.connection = new DataSource({
        type: 'postgres',
        host,
        port,
        username,
        password,
        database,
        synchronize: true,
        logging: true,
        entities: [`${environment === undefined ? 'dist' : 'src'}/infra/repos/postgres/entities/index.{js,ts}`],
        migrations: [`${environment === undefined ? 'dist' : 'src'}/infra/repos/postgres/migrations/*.{js,ts}`],
        subscribers: []
      })
    }
  }

  static getInstance (env?: DbCredentials): PostgresHelper {
    if (PostgresHelper.instance === undefined) {
      PostgresHelper.instance = new PostgresHelper(env)
    }
    return PostgresHelper.instance
  }

  async connect (): Promise<void> {
    await this.connection.initialize()
    await this.connection.synchronize()
  }

  getRepository<Entity> (entity: ObjectType<Entity>): Repository<Entity> {
    if (this.connection === undefined) throw new Error('')
    return this.connection.getRepository(entity)
  }
}
