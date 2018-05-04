'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Penjamins', [{
      nama: 'Kosasih',
      alamat: 'lampung',
      no_telp: '081222',
      level: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Penjamins', null, {});
  }
};
