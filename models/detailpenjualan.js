'use strict';
module.exports = (sequelize, DataTypes) => {
  var DetailPenjualan = sequelize.define('DetailPenjualan', {
    no_trans: DataTypes.STRING,
    produk: DataTypes.INTEGER,
    harga_jual: DataTypes.INTEGER,
    jumlah: DataTypes.INTEGER,
    subtotal: DataTypes.INTEGER,
    diskon: DataTypes.INTEGER,
    total_akhir: DataTypes.INTEGER
  }, {});
  DetailPenjualan.associate = function(models) {
    // associations can be defined here
    DetailPenjualan.belongsTo(models.Produk, { foreignKey: 'produk' })
  };
  DetailPenjualan.afterCreate((item, options) => {
    const { no_trans, produk, jumlah, harga_jual, total_akhir} = item
    sequelize.models.Persediaan.create({
      no_trans,
      produk,
      keluar: jumlah,
      nilai: harga_jual,
      total_nilai: total_akhir,
      jenis_transaksi: 'penjualan'
    })
  })
  DetailPenjualan.afterDestroy((item, options) => {
    const { no_trans , produk } = item
    sequelize.models.Persediaan.destroy({
      where: {
        no_trans,
        produk
      }
    }).then(persediaan => {
      return true
    }).catch(err => console.log(err))
  })
  return DetailPenjualan;
};
