'use strict';
module.exports = (sequelize, DataTypes) => {
  var TbsPembelian = sequelize.define('TbsPembelian', {
    user: DataTypes.INTEGER,
    produk: DataTypes.INTEGER,
    harga_beli: DataTypes.INTEGER,
    jumlah: DataTypes.INTEGER,
    subtotal: DataTypes.INTEGER,
    diskon: DataTypes.INTEGER,
    total_akhir: DataTypes.INTEGER
  }, {});
  TbsPembelian.associate = function(models) {
    // associations can be defined here
    TbsPembelian.belongsTo(models.Produk, { foreignKey: 'produk' })
  };
  return TbsPembelian;
};
