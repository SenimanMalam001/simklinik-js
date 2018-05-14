'use strict';
module.exports = (sequelize, DataTypes) => {
  var Persediaan = sequelize.define('Persediaan', {
    no_trans: DataTypes.STRING,
    produk: DataTypes.INTEGER,
    masuk: DataTypes.INTEGER,
    keluar: DataTypes.INTEGER,
    jenis_transaksi: DataTypes.STRING
  }, {});
  Persediaan.associate = function(models) {
    // associations can be defined here
  };
  return Persediaan;
};