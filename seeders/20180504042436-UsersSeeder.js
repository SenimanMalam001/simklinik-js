'use strict';
const bcrypt = require('bcrypt')


module.exports = {
  up: (queryInterface, Sequelize) => {
    const password = bcrypt.hashSync('rahasia', 10);
    return queryInterface.bulkInsert('users', [{
      name: 'admin',
      username: 'admin',
      password: password,
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
