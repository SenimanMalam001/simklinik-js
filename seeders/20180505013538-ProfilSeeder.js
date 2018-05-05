'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Profils', [{
      nama: 'SimKlinik Js',
      alamat: 'lampung',
      no_telp: '0812123',
      kode: 'K01',
      logo: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Profils', null, {});
  }
};
