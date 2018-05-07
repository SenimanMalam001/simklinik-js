'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('RuanganTerpakais', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ruangan: {
        type: Sequelize.INTEGER
      },
      registrasi: {
        type: Sequelize.INTEGER
      },
      status_ruangan: {
        type: Sequelize.INTEGER,
        defaultValue: 1
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('RuanganTerpakais');
  }
};
