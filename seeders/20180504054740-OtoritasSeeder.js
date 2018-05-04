'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Otoritas', [
    {
      name: 'get_user',
      display_name: 'Lihat User',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'create_user',
      display_name: 'Buat User',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'edit_user',
      display_name: 'Ubah User',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'delete_user',
      display_name: 'Hapus User',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'edit_otoritas_user',
      display_name: 'Ubah Otoritas User',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'get_otoritas',
      display_name: 'Lihat Otoritas',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'get_otoritas_user',
      display_name: 'Lihat Otoritas User',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'get_kategori_transaksi',
      display_name: 'Lihat Kategori Transaksi',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'create_kategori_transaksi',
      display_name: 'Buat Kategori Transaksi',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'edit_kategori_transaksi',
      display_name: 'Ubah Kategori Transaksi',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'delete_kategori_transaksi',
      display_name: 'Hapus Kategori Transaksi',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'get_kategori_produk',
      display_name: 'Lihat Kategori Produk',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'create_kategori_produk',
      display_name: 'Buat Kategori Produk',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'edit_kategori_produk',
      display_name: 'Ubah Kategori Produk',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'delete_kategori_produk',
      display_name: 'Hapus Kategori Produk',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'get_poli',
      display_name: 'Lihat Poli',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'create_poli',
      display_name: 'Buat Poli',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'edit_poli',
      display_name: 'Ubah Poli',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'delete_poli',
      display_name: 'Hapus Poli',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
    {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Otoritas', null, {});
  }
};