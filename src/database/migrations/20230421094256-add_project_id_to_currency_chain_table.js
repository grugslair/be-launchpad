'use strict';

const OLD_TABLE_NAME = 'currency_to_chain';
const NEW_TABLE_NAME = 'project_commit';
const CHAIN_ID = 'chain_id';
const PROJECT_ID = 'project_id';
const CONTRACT_ADDRESS = 'contract_address';
const VERSION = 'version';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameTable(OLD_TABLE_NAME, NEW_TABLE_NAME);
    await queryInterface.addColumn(NEW_TABLE_NAME, PROJECT_ID, {
      type: Sequelize.INTEGER,
      primaryKey: true,
      references: {
        model: {
          tableName: 'projects',
          schema: 'public',
        },
        key: 'id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    });
    await queryInterface.addColumn(NEW_TABLE_NAME, CONTRACT_ADDRESS, { type: Sequelize.STRING });
    await queryInterface.addColumn(NEW_TABLE_NAME, VERSION, { type: Sequelize.INTEGER });
    await queryInterface.removeColumn(NEW_TABLE_NAME, CHAIN_ID, { type: Sequelize.INTEGER });
    return;
  },
  down: async queryInterface => {
    await queryInterface.renameTable(NEW_TABLE_NAME, OLD_TABLE_NAME);
    await queryInterface.removeColumn(OLD_TABLE_NAME, PROJECT_ID);
    await queryInterface.removeColumn(OLD_TABLE_NAME, CONTRACT_ADDRESS);
    await queryInterface.removeColumn(OLD_TABLE_NAME, VERSION);
    // await queryInterface.addColumn(OLD_TABLE_NAME, CHAIN_ID, { type: Sequelize.INTEGER });
    return;
  },
};
