'use strict';
module.exports = (sequelize, DataTypes) => {
  var Produk = sequelize.define('Produk', {
    kode: DataTypes.STRING,
    nama: DataTypes.STRING,
    tipe: DataTypes.STRING,
    harga_beli: DataTypes.INTEGER,
    harga_jual_1: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    } ,
    harga_jual_2: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    } ,
    harga_jual_3: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    } ,
    harga_jual_4: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    } ,
  }, {});
  Produk.associate = function(models) {
    // associations can be defined here
  };
  return Produk;
};
