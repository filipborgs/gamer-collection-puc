import { UuidAdapter } from '@/infra/datatype'

export const makeUuidAdapter = (): UuidAdapter => new UuidAdapter()
