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
    {
      name: 'get_satuan',
      display_name: 'Lihat Satuan',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'create_satuan',
      display_name: 'Buat Satuan',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'edit_satuan',
      display_name: 'Ubah Satuan',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'delete_satuan',
      display_name: 'Hapus Satuan',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'get_ruangan',
      display_name: 'Lihat Ruangan',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'create_ruangan',
      display_name: 'Buat Ruangan',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'edit_ruangan',
      display_name: 'Ubah Ruangan',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'delete_ruangan',
      display_name: 'Hapus Ruangan',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'get_kas',
      display_name: 'Lihat Kas',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'create_kas',
      display_name: 'Buat Kas',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'edit_kas',
      display_name: 'Ubah Kas',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'delete_kas',
      display_name: 'Hapus Kas',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'get_penjamin',
      display_name: 'Lihat Penjamin',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'create_penjamin',
      display_name: 'Buat Penjamin',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'edit_penjamin',
      display_name: 'Ubah Penjamin',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'delete_penjamin',
      display_name: 'Hapus Penjamin',
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
