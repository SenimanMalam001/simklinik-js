'use strict';
module.exports = (sequelize, DataTypes) => {
  var KategoriProduk = sequelize.define('KategoriProduk', {
    name: DataTypes.STRING,
    display_name: DataTypes.STRING
  }, {});
  KategoriProduk.associate = function(models) {
    // associations can be defined here
  };
  return KategoriProduk;
};