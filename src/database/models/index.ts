import { Sequelize } from 'sequelize';
import DBconfig from '../../config/dbConfig';
const env = process.env.NODE_ENV || 'development';
const dbConfig = DBconfig[env];

const SQL = new Sequelize(
  dbConfig.database as string,
  dbConfig.username as string,
  dbConfig.password as string,
  dbConfig
);

// IMPORT MODELS
import { Project, ProjectAttributes } from './project';
import { VestingRule, VestingRuleAttributes } from './vestingRule';

const models = { Project, VestingRule };

Object.values(models).map((model) => model.initModel(SQL));

Object.values(models).map((model) => model.associateModel());

const DB = { Sequelize: SQL, ...models };

export {
  DB,
  ProjectAttributes,
  VestingRuleAttributes
};
