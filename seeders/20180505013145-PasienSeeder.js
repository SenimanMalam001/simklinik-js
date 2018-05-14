'use strict';
const faker = require('faker')

module.exports = {
  up: (queryInterface, Sequelize) => {
    let pasiens = []
    for (var i = 0; i < 1; i++) {
      pasiens.push({
        no_rm: `K01-${i + 1}`,
        nama: faker.name.findName(),
        gender: 'laki-laki',
        tanggal_lahir: '08-09-1995',
        alamat: 'lampung',
        no_telp: '0812222',
        penjamin: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    }
    return queryInterface.bulkInsert('Pasiens', pasiens, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Pasiens', null, {});
  }
};
