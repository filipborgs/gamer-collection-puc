import { type Uuid } from '@/data/protocols/datatype'
import { v4 } from 'uuid'

export class UuidAdapter implements Uuid {
  generate (): string {
    return v4()
  }
}
