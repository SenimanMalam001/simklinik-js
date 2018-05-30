'use strict';
module.exports = (sequelize, DataTypes) => {
  var Piutang = sequelize.define('Piutang', {
    no_penjualan: DataTypes.STRING,
    penjamin: DataTypes.INTEGER,
    jumlah: DataTypes.INTEGER,
    status_bayar: DataTypes.INTEGER,
    no_pembayaran: DataTypes.STRING
  }, {});
  Piutang.associate = function(models) {
    // associations can be defined here
  };
  return Piutang;
};