'use strict';
module.exports = (sequelize, DataTypes) => {
  var Penjamin = sequelize.define('Penjamin', {
    nama: DataTypes.STRING,
    alamat: DataTypes.STRING,
    no_telp: DataTypes.STRING,
    level: DataTypes.INTEGER
  }, {});
  Penjamin.associate = function(models) {
    // associations can be defined here
  };
  return Penjamin;
};