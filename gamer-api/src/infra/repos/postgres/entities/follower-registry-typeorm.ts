import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Relation } from 'typeorm'
import { UserTypeorm } from './user-typeorm'

@Entity('follower_registry')
export class FollowerRegistryTypeorm {
  @PrimaryGeneratedColumn()
    id: string

  @OneToOne(() => UserTypeorm)
  @JoinColumn({ name: 'follower_id' })
    follower: Relation<UserTypeorm>

  @OneToOne(() => UserTypeorm)
  @JoinColumn({ name: 'followed_id' })
    followed: Relation<UserTypeorm>

  @Column({ name: 'created_at' })
    createdAt: Date
}
