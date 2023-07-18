'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('raffles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      starknet_wallet_address: {
        type: Sequelize.STRING
      },
      starknet_id: {
        type: Sequelize.STRING
      },
      discord_id: {
        type: Sequelize.STRING
      },
      discord_username: {
        type: Sequelize.STRING
      },
      discord_role_wojak: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      twitter_username: {
        type: Sequelize.STRING
      },
      twitter_tweeted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      twitter_followed_grug: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      twitter_followed_briq: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deleted_at: {
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('raffles');
  }
};