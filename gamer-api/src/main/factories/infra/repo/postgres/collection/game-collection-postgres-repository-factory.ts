import { GameCollectionPostgresRepository } from '@/infra/repos/postgres/repo/collection'

export const makeGameCollectionPostgresFactory = (): GameCollectionPostgresRepository => new GameCollectionPostgresRepository()
