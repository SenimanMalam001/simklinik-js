'use strict';
const bcrypt = require('bcrypt')


module.exports = {
  up: (queryInterface, Sequelize) => {
    const password = bcrypt.hashSync('rahasia', 10);
    return queryInterface.bulkInsert('users', [
      {
        name: 'admin',
        username: 'admin',
        password: password,
        role: 'no_medis',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'dokter',
        username: 'dokter',
        password: password,
        role: 'dokter',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'paramedik',
        username: 'paramedik',
        password: password,
        role: 'paramedik',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'farmasi',
        username: 'farmasi',
        password: password,
        role: 'farmasi',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]
    , {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
