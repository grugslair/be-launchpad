'use strict';
const trxTable = 'projects';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const type = Sequelize.DataTypes.STRING;
    await queryInterface.changeColumn(trxTable, 'token_initial_supply', { type });
    await queryInterface.changeColumn(trxTable, 'token_total_supply', { type });
    await queryInterface.changeColumn(trxTable, 'target_amount', { type });
    await queryInterface.changeColumn(trxTable, 'public_sale_token_amount', { type });
    await queryInterface.changeColumn(trxTable, 'public_sale_token_sold', { type });
    await queryInterface.changeColumn(trxTable, 'public_sale_price', { type });
  },
  
  down: async(queryInterface) => {
    const type = Sequelize.DataTypes.INTEGER;
    await queryInterface.changeColumn(trxTable, 'token_initial_supply', { type });
    await queryInterface.changeColumn(trxTable, 'token_total_supply', { type });
    await queryInterface.changeColumn(trxTable, 'target_amount', { type });
    await queryInterface.changeColumn(trxTable, 'public_sale_token_amount', { type });
    await queryInterface.changeColumn(trxTable, 'public_sale_token_sold', { type });
    await queryInterface.changeColumn(trxTable, 'public_sale_price', { type });
  }
};
