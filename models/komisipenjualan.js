'use strict';
module.exports = (sequelize, DataTypes) => {
  var KomisiPenjualan = sequelize.define('KomisiPenjualan', {
    no_trans: DataTypes.STRING,
    user: DataTypes.INTEGER,
    produk: DataTypes.INTEGER,
    jumlah: DataTypes.INTEGER,
    nilai_komisi: DataTypes.INTEGER,
    total_komisi: DataTypes.INTEGER
  }, {});
  KomisiPenjualan.associate = function(models) {
    // associations can be defined here
    KomisiPenjualan.belongsTo(models.User, { foreignKey: 'user' })
    KomisiPenjualan.belongsTo(models.Produk, { foreignKey: 'produk'})
  };
  return KomisiPenjualan;
};
