'use strict';
module.exports = (sequelize, DataTypes) => {
  var Hutang = sequelize.define('Hutang', {
    no_pembelian: DataTypes.STRING,
    supplier: DataTypes.INTEGER,
    jumlah: DataTypes.INTEGER,
    status_bayar: DataTypes.INTEGER,
    no_pembayaran: DataTypes.STRING
  }, {});
  Hutang.associate = function(models) {
    // associations can be defined here
  };
  return Hutang;
};
