import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('user')
export class UserTypeorm {
  @PrimaryColumn()
    id: string

  @Column()
    name: string

  @Column()
    email: string

  @Column()
    password: string
}
