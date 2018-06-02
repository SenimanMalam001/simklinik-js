'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const produks = []
    for (var i = 0; i < 1000; i++) {
      produks.push({
        nama: `Obat Manjur  ${i}`,
        kode: `OB${i}`,
        tipe: 'barang',
        harga_beli: 1000,
        harga_jual_1: 1500,
        harga_jual_2: 2000,
        harga_jual_3: 2500,
        createdAt: new Date(),
        updatedAt: new Date(),
      })

    }
    return queryInterface.bulkInsert('Produks', [...produks,{
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
