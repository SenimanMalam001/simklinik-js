'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('KategoriProduks', [{
      name: 'obat',
      display_name: 'Obat',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('KategoriProduks', null, {});
  }
};
