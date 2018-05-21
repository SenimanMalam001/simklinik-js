'use strict';
module.exports = (sequelize, DataTypes) => {
  var DetailPembelian = sequelize.define('DetailPembelian', {
    no_trans: DataTypes.STRING,
    produk: DataTypes.INTEGER,
    harga_beli: DataTypes.INTEGER,
    jumlah: DataTypes.INTEGER,
    subtotal: DataTypes.INTEGER,
    diskon: DataTypes.INTEGER,
    total_akhir: DataTypes.INTEGER
  }, {});
  DetailPembelian.associate = function(models) {
    // associations can be defined here
    DetailPembelian.belongsTo(models.Produk, { foreignKey: 'produk' })
  };
  return DetailPembelian;
};
