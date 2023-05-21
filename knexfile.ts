import 'dotenv/config';
import { join } from 'path';
import { Knex } from 'knex';
import { knexSnakeCaseMappers } from 'objection';

const config: Knex.Config = {
  client: 'pg',
  debug: process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'staging',
  connection: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT ?? '5432', 10),
    database: process.env.DATABASE_DB_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
  },
  pool: {
    min: 2,
    max: 40,
    acquireTimeoutMillis: 120000,
  },
  migrations: {
    loadExtensions: ['.ts'],
    tableName: 'migrations',
    directory: join(__dirname, 'database', 'migrations'),
    stub: join(__dirname, 'database', 'migration.stub'),
  },
  seeds: {
    directory: join(__dirname, 'database', 'seeds'),
    stub: join(__dirname, 'database', 'seed.stub'),
  },
};

export default config;
