export interface FollowUserParams {
  followerId: string
  followedId: string
}

export interface FollowUser {
  follow: (data: FollowUserParams) => Promise<void>
}
