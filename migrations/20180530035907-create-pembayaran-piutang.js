'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('PembayaranPiutangs', {
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
      penjamin: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      dari_tanggal: {
        allowNull: false,
        type: Sequelize.DATE
      },
      sampai_tanggal: {
        allowNull: false,
        type: Sequelize.DATE
      },
      jumlah_bayar: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      cara_bayar: {
        allowNull: false,
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
    return queryInterface.dropTable('PembayaranPiutangs');
  }
};
