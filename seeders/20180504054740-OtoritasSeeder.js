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
      name: 'otoritas_user',
      display_name: 'Ubah Otoritas User',
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
