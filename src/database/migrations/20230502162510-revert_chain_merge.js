'use strict';

// TABLES
const PROJECT = 'projects';
const CHAIN_ID = 'chain_id';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(PROJECT, CHAIN_ID, {
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: 'chains',
          schema: 'public',
        },
        key: 'id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    });
    return;
  },
  down: async queryInterface => {
    await queryInterface.removeColumn(PROJECT, CHAIN_ID);
    return;
  },
};
