'use strict';
const currencyTable = 'currencies';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(currencyTable, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      symbol: { type: Sequelize.STRING },
      contract_address: { type: Sequelize.STRING },
      decimals: { type: Sequelize.STRING },
      name: { type: Sequelize.STRING },
      rate: { type: Sequelize.INTEGER },
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
    return queryInterface.dropTable(currencyTable);
  }
};
