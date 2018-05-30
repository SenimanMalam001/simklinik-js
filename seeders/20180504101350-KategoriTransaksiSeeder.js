'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const kategoriTransaksis = [{
        name: 'penjualan',
        display_name: 'Penjualan',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'pembelian',
        display_name: 'Pembelian',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'modal',
        display_name: 'Modal',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'biaya',
        display_name: 'Biaya',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'kas_mutasi',
        display_name: 'Kas Mutasi',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'pembayaran_piutang',
        display_name: 'Pembayaran Piutang',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'pembayaran_hutang',
        display_name: 'Pembayaran Hutang',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]
    return queryInterface.bulkInsert('KategoriTransaksis', kategoriTransaksis , {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('KategoriTransaksis', null, {});
  }
};
