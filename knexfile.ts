import 'dotenv/config';
import { join } from 'path';
import { Knex } from 'knex';
import { knexSnakeCaseMappers } from 'objection';

const config: Knex.Config = {
  client: 'pg',
  debug: true, // TODO: remove in prod
  connection: {
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT ?? '5432', 10),
    database: process.env.POSTGRES_DB_NAME,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
  },
  ...knexSnakeCaseMappers(),
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
