'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('TransaksiKas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      no_trans: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      kas: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      kategori: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      masuk: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      keluar: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      jenis_transaksi: {
        type: Sequelize.STRING,
        allowNull: false,
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
    return queryInterface.dropTable('TransaksiKas');
  }
};
