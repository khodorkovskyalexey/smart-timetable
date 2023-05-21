import * as Joi from 'joi';
import { BaseValidationOptions } from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'staging', 'production').required(),
  PORT: Joi.number().required(),
  SELF_BACKEND_URL: Joi.string().required(),

  // DATABASE
  DATABASE_HOST: Joi.string().required(),
  DATABASE_PORT: Joi.number().required(),
  DATABASE_NAME: Joi.string().required(),
  DATABASE_USER: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().required(),

  // JWT
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRES_IN: Joi.string().required(),
});

export const configuration = () => ({
  nodeEnv: process.env.NODE_ENV,
  port: process.env.PORT,
  url: {
    self: process.env.SELF_BACKEND_URL,
  },
  database: {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    dbName: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
});

export const validationOptions: BaseValidationOptions = {
  abortEarly: false,
  convert: true,
};
