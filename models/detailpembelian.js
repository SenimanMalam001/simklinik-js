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
  DetailPembelian.afterCreate((item, options) => {
    const { no_trans, produk, jumlah, harga_beli, total_akhir} = item
    sequelize.models.Persediaan.create({
      no_trans,
      produk,
      masuk: jumlah,
      nilai: harga_beli,
      total_nilai: total_akhir,
      jenis_transaksi: 'pembelian'
    })
  })
  DetailPembelian.afterDestroy((item, options) => {
    const { no_trans , produk } = item
    console.log('detail pembelian destroy ==========================');
    sequelize.models.Persediaan.destroy({
      where: {
        no_trans,
        produk
      }
    }).then(persediaan => {
      return true
    }).catch(err => console.log(err))
  })
  DetailPembelian.afterBulkDestroy(options => {
    console.log('bulk detail pembelian destroy ==========================');
  })
  return DetailPembelian;
};
