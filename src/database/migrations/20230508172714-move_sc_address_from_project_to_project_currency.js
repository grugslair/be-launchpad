'use strict';

const PROJECT = 'projects';
const PROJECT_TO_CURRENCY = 'project_to_currency';
const CROWD_SMART_CONTRACT = 'crowd_smart_contract';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn(PROJECT, CROWD_SMART_CONTRACT);
    await queryInterface.addColumn(PROJECT_TO_CURRENCY, CROWD_SMART_CONTRACT, {
      type: Sequelize.STRING,
    });
    return;
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn(PROJECT_TO_CURRENCY, CROWD_SMART_CONTRACT);
    await queryInterface.addColumn(PROJECT, CROWD_SMART_CONTRACT, {
      type: Sequelize.STRING,
    });
    return;
  },
};
