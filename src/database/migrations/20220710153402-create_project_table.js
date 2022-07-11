'use strict';
const tableName = 'projects';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(tableName, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      chain_id: {
        type: Sequelize.INTEGER
      },
      vesting_rule_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'vesting_rules',
            schema: 'public',
          },
          key: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
      },
      name: { type: Sequelize.STRING },
      token_contract_address: { type: Sequelize.STRING },
      token_symbol: { type: Sequelize.STRING },
      token_decimals: { type: Sequelize.INTEGER },
      token_initial_supply: { type: Sequelize.INTEGER },
      description: { type: Sequelize.TEXT },
      status: { type: Sequelize.STRING },
      banner: { type: Sequelize.STRING },
      logo: { type: Sequelize.STRING },
      target_amount: { type: Sequelize.INTEGER },
      public_sale_token_amount: { type: Sequelize.FLOAT },
      public_sale_token_sold: { type: Sequelize.FLOAT },
      public_sale_price: { type: Sequelize.FLOAT },
      min_investment: { type: Sequelize.FLOAT },
      period_start: { type: Sequelize.DATE },
      period_end: { type: Sequelize.DATE },
      discord_url: { type: Sequelize.STRING },
      twitter_url: { type: Sequelize.STRING },
      medium_url: { type: Sequelize.STRING },
      official_url: { type: Sequelize.STRING },
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
