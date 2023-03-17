import { DataSource } from 'typeorm'

export class PostgresHelper {
  private static instance?: PostgresHelper
  private readonly connection?: DataSource

  private constructor (host: string, port: number, username: string, password: string, database: string, environment: string) {
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
      migrations: [],
      subscribers: []
    })
  }

  static getInstance (host: string, port: number, username: string, password: string, database: string, environment: string): PostgresHelper {
    if (PostgresHelper.instance === undefined) {
      PostgresHelper.instance = new PostgresHelper(host, port, username, password, database, environment)
    }
    return PostgresHelper.instance
  }

  async connect (): Promise<void> {
    void this.connection.initialize()
  }
}
