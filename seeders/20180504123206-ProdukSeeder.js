'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Produks', [{
      nama: 'Obat Manjur',
      kode: 'OB1',
      tipe: 'barang',
      harga_beli: 1000,
      harga_jual_1: 1500,
      harga_jual_2: 2000,
      harga_jual_3: 2500,
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      nama: 'Jasa Manjur',
      kode: 'JS1',
      tipe: 'jasa',
      harga_beli: 0,
      harga_jual_1: 1500,
      harga_jual_2: 2000,
      harga_jual_3: 2500,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Produks', null, {});
  }
};
