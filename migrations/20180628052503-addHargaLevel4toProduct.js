'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Produks',
      'harga_jual_4',
      {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        after: 'harga_jual_3'
      }
    );

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
     'Produks',
     'harga_jual_4'
   );
  }
};
