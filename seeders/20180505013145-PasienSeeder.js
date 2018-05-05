'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
    return queryInterface.bulkInsert('Pasiens', [{
      no_rm: 'K01-1',
      nama: 'John Doe',
      gender: 'laki-laki',
      tanggal_lahir: '08-09-1995',
      alamat: 'lampung',
      no_telp: '0812222',
      penjamin: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Pasiens', null, {});
  }
};
