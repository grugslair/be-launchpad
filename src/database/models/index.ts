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
import { Chain, ChainAttributes } from './chain';
import { Currency, CurrencyAttributes } from './currency';
import { Project, ProjectAttributes } from './project';
import { VestingRule, VestingRuleAttributes } from './vestingRule';
import { Registration } from './registration';
import { Report } from './report';

const models = { Chain, Currency, Project, Registration, Report, VestingRule };

Object.values(models).map((model) => model.initModel(SQL));

Object.values(models).map((model) => model.associateModel());

const DB = { Sequelize: SQL, ...models };

export {
  DB,
  ChainAttributes,
  CurrencyAttributes,
  ProjectAttributes,
  VestingRuleAttributes
};
