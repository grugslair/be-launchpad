'use strict';
const tableName = 'vesting_rules';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(tableName, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      label: { type: Sequelize.STRING },
      tge_percentage: { type: Sequelize.INTEGER },
      type: { type: Sequelize.STRING }, // Daily or Monthly
      period_percentage: { type: Sequelize.INTEGER },
      cliff_period: { type: Sequelize.INTEGER },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deleted_at: {
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable(tableName);
  }
};
