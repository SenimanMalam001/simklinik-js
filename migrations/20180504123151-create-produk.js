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
        type: Sequelize.STRING,
        unique: true
      },
      nama: {
        type: Sequelize.STRING,
        unique: true
      },
      tipe: {
        type: Sequelize.STRING,
        allowNull: false
      },
      harga_beli: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      harga_jual_1: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      harga_jual_2: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      harga_jual_3: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      harga_jual_4: {
        type: Sequelize.INTEGER,
        defaultValue: 0
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
