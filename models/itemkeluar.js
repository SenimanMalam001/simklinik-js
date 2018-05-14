'use strict';
module.exports = (sequelize, DataTypes) => {
  var ItemKeluar = sequelize.define('ItemKeluar', {
    no_trans: DataTypes.STRING,
    produk: DataTypes.INTEGER,
    jumlah: DataTypes.INTEGER,
    keterangan: DataTypes.STRING
  }, {});
  ItemKeluar.associate = function(models) {
    // associations can be defined here
    ItemKeluar.belongsTo(models.Produk, { foreignKey: 'produk' })
  };
  ItemKeluar.afterCreate((item) => {
    const { no_trans, produk, jumlah} = item
    sequelize.models.Persediaan.create({
      no_trans,
      produk,
      keluar: jumlah,
      jenis_transaksi: 'item_keluar'
    })
  });
  ItemKeluar.afterDestroy(item => {
    const { no_trans }  = item
    sequelize.models.Persediaan.destroy({
      where: {
        no_trans: no_trans
      }
    }).then(persediaan => {
      return true
    }).catch( err => console.log(err))
  })
  ItemKeluar.afterUpdate(item => {
    const { no_trans, produk, jumlah} = item
    sequelize.models.Persediaan.destroy({
      where: {
        no_trans: no_trans
      }
    }).then(persediaan => {
      return sequelize.models.Persediaan.create({
        no_trans,
        produk,
        keluar: jumlah,
        jenis_transaksi: 'item_keluar'
      })
    }).then((persediaan) => {
      return true
    }).catch( err => console.log(err))
  })
  return ItemKeluar;
};
