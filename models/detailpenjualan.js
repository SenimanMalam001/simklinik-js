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
  DetailPenjualan.afterCreate(async (item, options) => {
    const { no_trans, produk, jumlah, harga_jual, total_akhir} = item
    try {

    const total_nilai_masuk = await sequelize.models.Persediaan.sum('total_nilai',{
      where: {
        produk,
        keluar: 0
      }
    })
    const total_masuk = await sequelize.models.Persediaan.sum('masuk',{
      where: {
        produk,
        keluar: 0
      }
    })
    const hpp = Number(total_nilai_masuk) / Number(total_masuk)
    sequelize.models.Persediaan.create({
      no_trans,
      produk,
      keluar: jumlah,
      nilai: hpp,
      total_nilai: hpp * jumlah,
      jenis_transaksi: 'penjualan'
    }).catch((err) => {
      console.log(err);
    })
    } catch (e) {
      console.log(e);
    }

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
