export default () => ({
  port: process.env.PORT || 4200,
  environment: process.env.NODE_ENV,
  database: {
    postgres: {
      host: process.env.DB_POSTGRES_HOST,
      port: process.env.DB_POSTGRES_PORT,
      user: process.env.DB_POSTGRES_USER,
      password: process.env.DB_POSTGRES_PASSWORD,
      db: process.env.DB_POSTGRES_DB,
    },
    mongo: {
      url: process.env.DB_MONGO_URL,
    },
  },
});
