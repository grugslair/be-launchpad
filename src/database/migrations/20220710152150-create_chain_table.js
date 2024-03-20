'use strict';
const tableName = 'chains';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(tableName, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      network_id: { type: Sequelize.STRING },
      rpc_url: { type: Sequelize.STRING },
      name: { type: Sequelize.STRING },
      logo: { type: Sequelize.STRING },
      color: { type: Sequelize.STRING },
      created_at: {
        allowNull: false,
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
