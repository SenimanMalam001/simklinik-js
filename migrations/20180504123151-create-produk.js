'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Produks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      kode: {
        type: Sequelize.STRING
      },
      nama: {
        type: Sequelize.STRING
      },
      tipe: {
        type: Sequelize.STRING
      },
      harga_beli: {
        type: Sequelize.INTEGER
      },
      harga_jual_1: {
        type: Sequelize.INTEGER
      },
      harga_jual_2: {
        type: Sequelize.INTEGER
      },
      harga_jual_3: {
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable('Produks');
  }
};