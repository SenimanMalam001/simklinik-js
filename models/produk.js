'use strict';
module.exports = (sequelize, DataTypes) => {
  var Produk = sequelize.define('Produk', {
    kode: DataTypes.STRING,
    nama: DataTypes.STRING,
    tipe: DataTypes.STRING,
    harga_beli: DataTypes.INTEGER,
    harga_jual_1: DataTypes.INTEGER,
    harga_jual_2: DataTypes.INTEGER,
    harga_jual_3: DataTypes.INTEGER
  }, {});
  Produk.associate = function(models) {
    // associations can be defined here
  };
  return Produk;
};