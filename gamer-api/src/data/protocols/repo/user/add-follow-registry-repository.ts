
export interface AddFollowRegistryRepositoryParams {
  followerId: string
  followedId: string
}

export interface AddFollowRegistryRepository {
  add: (data: AddFollowRegistryRepositoryParams) => Promise<void>
}
