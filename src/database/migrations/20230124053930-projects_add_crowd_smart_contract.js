'use strict';

const TABLE_NAME = 'projects';
const COLUMN_NAME = 'crowd_smart_contract';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(TABLE_NAME, COLUMN_NAME, {
      type: Sequelize.STRING,
    });
    return;
  },
  down: async queryInterface => {
    await queryInterface.removeColumn(TABLE_NAME, COLUMN_NAME);
    return;
  },
};
