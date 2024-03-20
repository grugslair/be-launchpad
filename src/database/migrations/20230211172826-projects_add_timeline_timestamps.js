'use strict';

const TABLE_NAME = 'projects';
const PREV_PERIOD_START = 'period_start';
const PREV_PERIOD_END = 'period_end';
const REG_PERIOD_START = 'registration_period_start';
const REG_PERIOD_END = 'registration_period_end';
const BUY_PERIOD_START = 'buy_period_start';
const BUY_PERIOD_END = 'buy_period_end';
const CLAIM_PERIOD_START = 'claim_period_start';
const MAX_ALLOCATION = 'max_allocation';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn(TABLE_NAME, PREV_PERIOD_START, REG_PERIOD_START);
    await queryInterface.renameColumn(TABLE_NAME, PREV_PERIOD_END, REG_PERIOD_END);
    await queryInterface.addColumn(TABLE_NAME, BUY_PERIOD_START, { type: Sequelize.DATE });
    await queryInterface.addColumn(TABLE_NAME, BUY_PERIOD_END, { type: Sequelize.DATE });
    await queryInterface.addColumn(TABLE_NAME, CLAIM_PERIOD_START, { type: Sequelize.DATE });
    await queryInterface.addColumn(TABLE_NAME, MAX_ALLOCATION, { type: Sequelize.INTEGER });
    return;
  },
  down: async queryInterface => {
    await queryInterface.renameColumn(TABLE_NAME, REG_PERIOD_START, PREV_PERIOD_START);
    await queryInterface.renameColumn(TABLE_NAME, REG_PERIOD_END, PREV_PERIOD_END);
    await queryInterface.removeColumn(TABLE_NAME, BUY_PERIOD_START);
    await queryInterface.removeColumn(TABLE_NAME, BUY_PERIOD_END);
    await queryInterface.removeColumn(TABLE_NAME, CLAIM_PERIOD_START);
    await queryInterface.removeColumn(TABLE_NAME, MAX_ALLOCATION);
    return;
  },
};
