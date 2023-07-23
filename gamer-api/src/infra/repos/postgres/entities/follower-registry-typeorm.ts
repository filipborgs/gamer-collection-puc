import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm'
import { UserTypeorm } from './user-typeorm'

@Entity('follower_registry')
export class FollowerRegistryTypeorm {
  @PrimaryGeneratedColumn()
    id: string

  @ManyToOne(() => UserTypeorm, (user) => user.id)
  @JoinColumn({ name: 'follower_id' })
    follower: Relation<UserTypeorm>

  @ManyToOne(() => UserTypeorm, (user) => user.id)
  @JoinColumn({ name: 'followed_id' })
    followed: Relation<UserTypeorm>

  @Column({ name: 'created_at' })
    createdAt: Date
}
