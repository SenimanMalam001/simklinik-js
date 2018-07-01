'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Produks',
      'satuan',
      {
        type: Sequelize.STRING,
        defaultValue: null,
        allowNull: true,
        after: 'tipe'
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
     'Produks',
     'satuan'
   );
  }
};
