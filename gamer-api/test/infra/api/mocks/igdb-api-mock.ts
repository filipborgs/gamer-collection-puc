/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const mockAuthIgdbResponse = () => ({
  access_token: 'token',
  expires_in: 5297317,
  token_type: 'bearer'
})

export const mockLoadGamesIgdbResponse = () => ([
  {
    count: 10
  },
  {
    result: [{
      id: 1,
      name: 'any_name',
      platforms: [{
        id: 2,
        name: 'any_platform'
      }]
    },
    {
      id: 2,
      name: 'any_name_2',
      platforms: [{
        id: 3,
        name: 'any_platform_2'
      }]
    }]
  }
])
