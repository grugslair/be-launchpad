'use strict';
const tableName = 'reports';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(tableName, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      type: { type: Sequelize.STRING },
      title: { type: Sequelize.STRING },
      subtitle: { type: Sequelize.STRING },
      image_url: { type: Sequelize.STRING },
      pdf_url: { type: Sequelize.STRING },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deleted_at: {
        type: Sequelize.DATE,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable(tableName);
  }
};
