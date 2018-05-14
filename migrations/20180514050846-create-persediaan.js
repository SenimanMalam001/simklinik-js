'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Persediaans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      no_trans: {
        type: Sequelize.STRING
      },
      produk: {
        type: Sequelize.INTEGER
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
        type: Sequelize.STRING
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
    return queryInterface.dropTable('Persediaans');
  }
};
