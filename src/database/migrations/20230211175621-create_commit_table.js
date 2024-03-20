'use strict';
const trxTable = 'commits';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(trxTable, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      project_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'projects',
            schema: 'public',
          },
          key: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
      },
      status: { type: Sequelize.STRING },
      trx_hash: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
      },
      trx_timestamp: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      wallet_address: { type: Sequelize.STRING },
      amount: { type: Sequelize.INTEGER },
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
    return queryInterface.dropTable(trxTable);
  }
};
