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
import { Project, ProjectAttributes } from './project';
import { VestingRule, VestingRuleAttributes } from './vestingRule';
import { WalletBinding } from './walletBinding';

const models = { Project, VestingRule, WalletBinding };

Object.values(models).forEach((model) => {
  model.initModel(SQL);
  console.log(`Model ${model.name} initialized successfully.`);
});

Object.values(models).forEach((model) => {
  if (model.associateModel) {
    model.associateModel();
    console.log(`Associations for model ${model.name} set up successfully.`);
  }
});

const DB = { Sequelize: SQL, ...models };

export {
  DB,
  ProjectAttributes,
  VestingRuleAttributes
};
