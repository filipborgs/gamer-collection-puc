process.env.API_URL = 'https://e292-45-167-54-178.ngrok-free.app/api'

export const makeApiUrl = (path) => `${process.env.API_URL}${path}`
