'use strict';
module.exports = (sequelize, DataTypes) => {
  var Ruangan = sequelize.define('Ruangan', {
    kode: DataTypes.STRING,
    nama: DataTypes.STRING,
    jumlah: DataTypes.INTEGER
  }, {});
  Ruangan.associate = function(models) {
    // associations can be defined here
  };
  return Ruangan;
};