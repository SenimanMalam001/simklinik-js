'use strict';
module.exports = (sequelize, DataTypes) => {
  var TransaksiKas = sequelize.define('TransaksiKas', {
    no_trans: DataTypes.STRING,
    kas: DataTypes.INTEGER,
    kategori: DataTypes.INTEGER,
    masuk: DataTypes.INTEGER,
    keluar: DataTypes.INTEGER,
    jenis_transaksi: DataTypes.STRING
  }, {});
  TransaksiKas.associate = function(models) {
    // associations can be defined here
  };
  return TransaksiKas;
};