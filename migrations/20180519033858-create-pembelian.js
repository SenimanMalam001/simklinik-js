'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Pembelians', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      no_trans: {
        allowNull: false,
        type: Sequelize.STRING
      },
      supplier: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      no_faktur_supplier: {
        type: Sequelize.STRING
      },
      status_beli: {
        allowNull: false,
        type: Sequelize.STRING
      },
      subtotal: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      diskon: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      total_akhir: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      cara_bayar: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      jumlah_bayar: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      jumlah_kredit: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      userCreated: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      userEdited: {
        allowNull: false,
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
    return queryInterface.dropTable('Pembelians');
  }
};
