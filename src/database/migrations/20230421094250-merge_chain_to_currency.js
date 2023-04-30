'use strict';

// TABLES
const CURRENCY = 'currencies';
const PROJECT = 'projects';

const CHAIN_ID = 'chain_id';
// CHAIN COLUMNS
const CHAIN_NAME = 'chain_name';
const NETWORK_ID = 'network_id';
const RPC_URL = 'rpc_url';
const CHAIN_LOGO = 'chain_logo';
const CHAIN_COLOR = 'chain_color';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(CURRENCY, CHAIN_NAME, { type: Sequelize.STRING });
    await queryInterface.addColumn(CURRENCY, NETWORK_ID, { type: Sequelize.STRING });
    await queryInterface.addColumn(CURRENCY, RPC_URL, { type: Sequelize.STRING });
    await queryInterface.addColumn(CURRENCY, CHAIN_LOGO, { type: Sequelize.STRING });
    await queryInterface.addColumn(CURRENCY, CHAIN_COLOR, { type: Sequelize.STRING });
    await queryInterface.removeColumn(PROJECT, CHAIN_ID);
    return;
  },
  down: async queryInterface => {
    await queryInterface.removeColumn(CURRENCY, CHAIN_NAME);
    await queryInterface.removeColumn(CURRENCY, NETWORK_ID);
    await queryInterface.removeColumn(CURRENCY, RPC_URL);
    await queryInterface.removeColumn(CURRENCY, CHAIN_LOGO);
    await queryInterface.removeColumn(CURRENCY, CHAIN_COLOR);
    await queryInterface.addColumn(PROJECT, CHAIN_ID, { type: Sequelize.INTEGER });
    return;
  },
};
