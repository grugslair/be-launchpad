'use strict';
const projectVestingTable = 'project_vesting';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(projectVestingTable, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      project_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
      },
      contract_address: { type: Sequelize.STRING },
      details: { type: Sequelize.JSONB },
      version: { type: Sequelize.INTEGER },
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
    return queryInterface.dropTable(projectVestingTable);
  }
};
