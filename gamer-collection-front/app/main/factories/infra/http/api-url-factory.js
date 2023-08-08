process.env.API_URL = 'https://gamer-api.cyclic.app/api'

export const makeApiUrl = (path) => `${process.env.API_URL}${path}`
