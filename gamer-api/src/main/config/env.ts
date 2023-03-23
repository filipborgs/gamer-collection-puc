export default {
  clientId: process.env.CLIENT_ID_IGDB ?? '',
  secret: process.env.SECRET_IGDB ?? '',
  port: process.env.PORT ?? 5050,
  twitchAuthUrl: process.env.TWITCH_AUTH_URL ?? 'https://id.twitch.tv/oauth2/token',
  igdbUrl: process.env.IGDB_URL ?? 'https://api.igdb.com',
  dbHost: process.env.DB_HOST ?? 'localhost',
  dbPort: Number(process.env.DB_PORT) ?? 5432,
  dbUserName: process.env.DB_USERNAME ?? 'postgres',
  dbPassword: process.env.DB_PASSWORD ?? 'postgres',
  dbDatabase: process.env.DB_DATABASE ?? 'gamer-api',
  tsNode: process.env.TS_NODE_DEV,
  salt: Number(process.env.SALT_BCRYPT) || 12,
  jwtPrivateKey: process.env.PRIVATE_JWT_KEY || 'any_key',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1h'
}
