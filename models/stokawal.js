'use strict';
module.exports = (sequelize, DataTypes) => {
  var StokAwal = sequelize.define('StokAwal', {
    no_trans: DataTypes.STRING,
    produk: DataTypes.INTEGER,
    jumlah: DataTypes.INTEGER
  }, {
  });
  StokAwal.associate =  function(models) {
    // associations can be defined here
    StokAwal.belongsTo(models.Produk, { foreignKey: 'produk' })
  };
  StokAwal.beforeCreate(async (item, options) => {
    try {
      //no trans
      if (!item.no_trans) {
        const stokAwal = await StokAwal.findOne({ order: [['createdAt', 'DESC']]})
        if (stokAwal) {
          let { no_trans } = stokAwal
          no_trans = no_trans.split('-')
          no_trans = Number(no_trans[1]) + 1
          no_trans = `SA-${no_trans}`
          item.no_trans = no_trans
        } else {
          item.no_trans = 'SA-1'
        }
      }
    } catch (e) {
      console.log(e);
    }
  });
  StokAwal.afterCreate((item) => {
    const { no_trans, produk, jumlah} = item
    sequelize.models.Persediaan.create({
      no_trans,
      produk,
      masuk: jumlah,
      jenis_transaksi: 'stok_awal'
    })
  });
  StokAwal.afterDestroy(item => {
    const { no_trans }  = item
    sequelize.models.Persediaan.destroy({
      where: {
        no_trans: no_trans
      }
    }).then(persediaan => {
      return true
    }).catch( err => console.log(err))
  })
  StokAwal.afterUpdate(item => {
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
        jenis_transaksi: 'stok_awal'
      })
    }).then((persediaan) => {
      return true
    }).catch( err => console.log(err))
  })
  return StokAwal;
};
