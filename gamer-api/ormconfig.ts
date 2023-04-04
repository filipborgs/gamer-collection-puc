import 'module-alias/register'
import * as dotenv from 'dotenv'
import { DataSource } from 'typeorm'
dotenv.config()

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  logging: true,
  entities: [`${process.env.TS_NODE_DEV === undefined ? 'dist' : 'src'}/infra/repos/postgres/entities/index.{js,ts}`],
  migrations: ['src/infra/repos/postgres/migrations/*.{js,ts}'],
  subscribers: []
})
