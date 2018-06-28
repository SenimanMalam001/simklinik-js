'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Penjualans',
      'keterangan',
      {
        type: Sequelize.STRING,
        allowNull: true,
        after: 'jumlah_kredit'
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
     'Penjualans',
     'keterangan'
   );
  }
};
