'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Polis', [{
      name: 'rawat_jalan',
      display_name: 'Rawat Jalan',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      name: 'rawat_inap',
      display_name: 'Rawat Inap',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Polis', null, {});
  }
};
