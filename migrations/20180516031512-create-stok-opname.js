'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('StokOpnames', {
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
      stok_komputer: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      stok_akhir: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      selisih: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      nilai_selisih: {
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
    return queryInterface.dropTable('StokOpnames');
  }
};
