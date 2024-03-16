'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('wallet_bindings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ethereum_address: { // Updated to snake_case
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      stark_net_address: { // Updated to snake_case
        type: Sequelize.STRING,
        allowNull: true
      },
      whitelist_amount: { // Updated to snake_case
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      created_at: { // Reflects automatic conversion
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: { // Reflects automatic conversion
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('wallet_bindings');
  }
};
