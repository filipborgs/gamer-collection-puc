import { GameCollectionPostgresRepository } from '@/infra/repos/postgres/repo/colletions'

export const makeGameCollectionPostgresFactory = (): GameCollectionPostgresRepository => new GameCollectionPostgresRepository()
