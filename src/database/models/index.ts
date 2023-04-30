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
import { Commit, CommitAttributes } from './commit';
import { Currency, CurrencyAttributes } from './currency';
import { ProjectCommit } from './projectCommit';
import { Project, ProjectAttributes } from './project';
import { ProjectVesting } from './projectVesting';
import { VestingRule, VestingRuleAttributes } from './vestingRule';
import { Registration } from './registration';
import { Report } from './report';

const models = {
  Commit,
  Currency,
  ProjectCommit,
  Project,
  ProjectVesting,
  Registration,
  Report,
  VestingRule,
};

Object.values(models).map((model) => model.initModel(SQL));

Object.values(models).map((model) => model.associateModel(SQL));

const DB = { Sequelize: SQL, ...models };

export {
  DB,
  CommitAttributes,
  CurrencyAttributes,
  ProjectAttributes,
  VestingRuleAttributes
};
