'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Kas', [{
      nama: 'Kas Utama',
      kode: 'KA1',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      nama: 'Kas Cadangan',
      kode: 'KA2',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Kas', null, {});
  }
};
