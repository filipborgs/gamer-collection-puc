process.env.API_URL = 'http://localhost:5050/api'

export const makeApiUrl = (path) => `${process.env.API_URL}${path}`
