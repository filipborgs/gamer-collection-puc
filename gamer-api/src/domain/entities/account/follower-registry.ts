export interface FollowerRegistry {
  follower: {
    id: string
    name: string
  }
  followed: {
    id: string
    name: string
  }
  createdAt: Date
}
