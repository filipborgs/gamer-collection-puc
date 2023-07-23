import { FollowerRegistry } from '@/domain/entities'

export interface LoadFollowsByFollowerIdParams {
  followerId: string
}

export interface LoadFollowsByFollowerId {
  loadFollows: (data: LoadFollowsByFollowerIdParams) => Promise<FollowerRegistry[]>
}
