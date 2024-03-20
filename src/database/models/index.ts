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

// Try to authenticate with the database
SQL.authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch(err => console.error('Unable to connect to the database:', err));

// IMPORT MODELS
import { Commit, CommitAttributes } from './commit';
import { Chain, ChainAttributes } from './chain';
import { Currency, CurrencyAttributes } from './currency';
import { ProjectCommit } from './projectCommit';
import { Project, ProjectAttributes } from './project';
import { ProjectVesting } from './projectVesting';
import { ProjectToCurrency } from './projectToCurrency';
import { VestingRule, VestingRuleAttributes } from './vestingRule';
import { Registration } from './registration';
import { Report } from './report';
import { WalletBinding } from './walletBinding';

const models = {
  Commit,
  Chain,
  Currency,
  ProjectCommit,
  Project,
  ProjectVesting,
  ProjectToCurrency,
  Registration,
  Report,
  VestingRule,
  WalletBinding
};

Object.values(models).map((model) => model.initModel(SQL));

Object.values(models).map((model) => model.associateModel(SQL));

const DB = { Sequelize: SQL, ...models };

export {
  DB,
  ChainAttributes,
  CommitAttributes,
  CurrencyAttributes,
  ProjectAttributes,
  VestingRuleAttributes
};
