'use strict';
module.exports = (sequelize, DataTypes) => {
  var TbsPenjualan = sequelize.define('TbsPenjualan', {
    user: DataTypes.INTEGER,
    produk: DataTypes.INTEGER,
    harga_jual: DataTypes.INTEGER,
    jumlah: DataTypes.INTEGER,
    subtotal: DataTypes.INTEGER,
    diskon: DataTypes.INTEGER,
    total_akhir: DataTypes.INTEGER
  }, {});
  TbsPenjualan.associate = function(models) {
    // associations can be defined here
    TbsPenjualan.belongsTo(models.Produk, { foreignKey: 'produk' })
  };
  return TbsPenjualan;
};
