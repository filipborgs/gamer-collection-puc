export default {
  clientId: process.env.CLIENT_ID_IGDB ?? '',
  secret: process.env.SECRET_IGDB ?? '',
  port: process.env.PORT ?? 5050,
  twitchAuthUrl: process.env.TWITCH_AUTH_URL ?? 'https://id.twitch.tv/oauth2/token',
  igdbUrl: process.env.IGDB_URL ?? 'https://api.igdb.com'
}
