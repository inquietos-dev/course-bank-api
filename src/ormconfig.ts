import { ConnectionOptions } from 'typeorm';

const config: ConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: +process.env.DB_POSTGRES_PORT,
  username: process.env.DB_POSTGRES_USER,
  password: process.env.DB_POSTGRES_PASSWORD,
  database: process.env.DB_POSTGRES_DB,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: process.env.NODE_ENV !== 'development',
  logging: ['query', 'error'],
  migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
  migrationsRun: true,
  cli: {
    migrationsDir: './migrations',
  },
};

export = config;
