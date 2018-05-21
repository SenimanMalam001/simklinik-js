'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Penjualans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      no_trans: {
        type: Sequelize.STRING
      },
      penjamin: {
        type: Sequelize.INTEGER
      },
      status_jual: {
        type: Sequelize.STRING
      },
      subtotal: {
        type: Sequelize.INTEGER
      },
      diskon: {
        type: Sequelize.INTEGER
      },
      total_akhir: {
        type: Sequelize.INTEGER
      },
      cara_bayar: {
        type: Sequelize.INTEGER
      },
      jumlah_bayar: {
        type: Sequelize.INTEGER
      },
      jumlah_kredit: {
        type: Sequelize.INTEGER
      },
      userCreated: {
        type: Sequelize.INTEGER
      },
      userEdited: {
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
    return queryInterface.dropTable('Penjualans');
  }
};