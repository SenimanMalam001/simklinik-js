'use strict';
module.exports = (sequelize, DataTypes) => {
  var ItemMasuk = sequelize.define('ItemMasuk', {
    no_trans: DataTypes.STRING,
    produk: DataTypes.INTEGER,
    jumlah: DataTypes.INTEGER,
    keterangan: DataTypes.STRING
  }, {});
  ItemMasuk.associate = function(models) {
    ItemMasuk.belongsTo(models.Produk, { foreignKey: 'produk' })
  };
  ItemMasuk.afterCreate((item) => {
    const { no_trans, produk, jumlah} = item
    sequelize.models.Persediaan.create({
      no_trans,
      produk,
      masuk: jumlah,
      jenis_transaksi: 'item_masuk'
    })
  });
  ItemMasuk.afterDestroy(item => {
    const { no_trans }  = item
    sequelize.models.Persediaan.destroy({
      where: {
        no_trans: no_trans
      }
    }).then(persediaan => {
      return true
    }).catch( err => console.log(err))
  })
  ItemMasuk.afterUpdate(item => {
    const { no_trans, produk, jumlah} = item
    sequelize.models.Persediaan.destroy({
      where: {
        no_trans: no_trans
      }
    }).then(persediaan => {
      return sequelize.models.Persediaan.create({
        no_trans,
        produk,
        masuk: jumlah,
        jenis_transaksi: 'item_masuk'
      })
    }).then((persediaan) => {
      return true
    }).catch( err => console.log(err))
  })
  return ItemMasuk;
};
