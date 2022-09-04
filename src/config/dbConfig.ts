import { config } from 'dotenv';
import { Options } from 'sequelize';
config();

const defaultDBconfig = {
  logging: false,
  pool: {
    max: 15,
    min: 0,
    idle: 10000,
    acquire: 10000,
  },
  define: {
    underscored: true,
  },
  ssl: true,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
};

const DBconfig: Record<string, Options> = {
  development: {
    ...defaultDBconfig, // REPLACE THE DEFAULT IF NEEDED
    database: process.env.DB_DEV_DATABASE || 'grug',
    username: process.env.DB_DEV_USERNAME || 'development',
    password: process.env.DB_DEV_PASS || 'password',
    host: process.env.DB_DEV_HOST || 'localhost',
    port: process.env.DB_DEV_PORT ? Number(process.env.DB_DEV_PORT) : 5432,
    dialect: 'postgres',
  },
  staging: {
    ...defaultDBconfig, // REPLACE THE DEFAULT IF NEEDED
    database: process.env.DB_STG_DATABASE || 'grug',
    username: process.env.DB_STG_USERNAME || 'development',
    password: process.env.DB_STG_PASS || 'password',
    host: process.env.DB_STG_HOST || 'localhost',
    port: process.env.DB_STG_PORT ? Number(process.env.DB_STG_PORT) : 5432,
    dialect: 'postgres',
  },
  test: {
    ...defaultDBconfig, // REPLACE THE DEFAULT IF NEEDED
    database: process.env.DB_TEST_DATABASE || 'pipelines',
    username: process.env.DB_TEST_USERNAME || 'test_user',
    password: process.env.DB_TEST_PASS || 'test_user_password',
    host: process.env.DB_TEST_HOST || 'localhost',
    port: process.env.DB_TEST_PORT ? Number(process.env.DB_TEST_PORT) : 5432,
    dialect: 'postgres',
  },
  production: {
    ...defaultDBconfig, // REPLACE THE DEFAULT IF NEEDED
    database: process.env.DB_PRD_DATABASE || 'grug',
    username: process.env.DB_PRD_USERNAME || 'development',
    password: process.env.DB_PRD_PASS || 'password',
    host: process.env.DB_PRD_HOST || 'localhost',
    port: process.env.DB_PRD_PORT ? Number(process.env.DB_PRD_PORT) : 5432,
    dialect: 'postgres',
  },
};

export default DBconfig;

module.exports = DBconfig;
