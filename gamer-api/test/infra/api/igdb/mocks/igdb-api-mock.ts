/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const mockAuthIgdbResponse = () => ({
  access_token: 'token',
  expires_in: 5297317,
  token_type: 'bearer'
})

export const mockLoadGamesIgdbResponse = () => ([
  {
    name: 'count',
    count: 10
  },
  {
    name: 'games',
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

export const mockLoadPlatformsIgdbResponse = () => ([
  {
    name: 'count',
    count: 10
  },
  {
    name: 'games',
    result: [
      {
        id: 48,
        abbreviation: 'PS4',
        alternative_name: 'PS4',
        category: 1,
        generation: 8,
        name: 'PlayStation 4'
      },
      {
        id: 2,
        name: 'any_name_2',
        abbreviation: 'any_name_3',
        alternative_name: 'any_name_',
        category: 4,
        generation: 2
      }
    ]
  }
])
