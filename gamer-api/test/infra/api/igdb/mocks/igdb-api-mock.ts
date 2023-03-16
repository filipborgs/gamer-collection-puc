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
      cover: {
        id: 2,
        image_id: 'any_image_id'
      }
    },
    {
      id: 2,
      name: 'any_name_2'
    }]
  }
])

export const mockLoadGameByIdIgdbResponse = () => ([
  {
    id: 1,
    name: 'any_name',
    first_release_date: 1431993600,
    cover: {
      id: 12,
      image_id: 'any_image_id'
    },
    platforms: [{
      id: 3,
      name: 'any_platform_2'
    }]
  }
])
