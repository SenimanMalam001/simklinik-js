'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Registrasis', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      no_reg: {
        type: Sequelize.STRING
      },
      pasien: {
        type: Sequelize.STRING,
        allowNull: false
      },
      penjamin: {
        type: Sequelize.INTEGER
      },
      poli: {
        type: Sequelize.INTEGER
      },
      dokter: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      ruangan: {
        type: Sequelize.INTEGER
      },
      status_registrasi: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      jenis_registrasi: {
        type: Sequelize.STRING
      },
      no_antrian: {
        type: Sequelize.INTEGER,
        allowNull: false
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
    return queryInterface.dropTable('Registrasis');
  }
};
