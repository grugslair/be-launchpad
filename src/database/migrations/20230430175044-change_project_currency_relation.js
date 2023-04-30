'use strict';

const PROJECT = 'projects';
const CURRENCY = 'currencies';
const PROJECT_TO_CURRENCY = 'project_to_currency';

const PROJECT_CURRENCY_ID = 'public_sale_currency_id';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn(PROJECT, PROJECT_CURRENCY_ID);

    await queryInterface.createTable(PROJECT_TO_CURRENCY, {
      project_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: {
            tableName: PROJECT,
            schema: 'public',
          },
          key: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
      },
      currency_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: {
            tableName: CURRENCY,
            schema: 'public',
          },
          key: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
      },
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

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn(PROJECT, PROJECT_CURRENCY_ID, {
      type: Sequelize.INTEGER,
      primaryKey: true,
      references: {
        model: {
          tableName: 'projects',
          schema: 'public',
        },
        key: 'id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    });
    await queryInterface.dropTable(PROJECT_TO_CURRENCY);
  }
};
