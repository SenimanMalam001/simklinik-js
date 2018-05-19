'use strict';
module.exports = (sequelize, DataTypes) => {
  var KasMutasi = sequelize.define('KasMutasi', {
    no_trans: DataTypes.STRING,
    dari_kas: DataTypes.INTEGER,
    ke_kas: DataTypes.INTEGER,
    jumlah: DataTypes.INTEGER,
    keterangan: DataTypes.STRING
  }, {});
  KasMutasi.associate = function(models) {
    // associations can be defined here
    KasMutasi.belongsTo(models.Kas, { foreignKey: 'dari_kas', as: 'DariKas' })
    KasMutasi.belongsTo(models.Kas, { foreignKey: 'ke_kas', as: 'KeKas' })
  };
  KasMutasi.beforeCreate(async (item, options) => {
    try {
      //no trans
      const kasMutasi = await KasMutasi.findOne({ order: [['createdAt', 'DESC']]})
      if (kasMutasi) {
        let { no_trans } = kasMutasi
        no_trans = no_trans.split('-')
        no_trans = Number(no_trans[1]) + 1
        no_trans = `KMT-${no_trans}`
        item.no_trans = no_trans
      } else {
        item.no_trans = 'KMT-1'
      }
    } catch (e) {
      console.log(e);
    }
  });
  KasMutasi.afterCreate(async (item) => {
    const { no_trans, dari_kas, ke_kas, jumlah} = item

    try {
      const kategori  = await sequelize.models.KategoriTransaksi.findOne({
        where: {
          name: 'kas_mutasi'
        }
      })
      await sequelize.models.TransaksiKas.create({
        no_trans,
        kas: dari_kas,
        keluar: jumlah,
        kategori: kategori.id,
        jenis_transaksi: 'kas_mutasi'
      })
      await sequelize.models.TransaksiKas.create({
        no_trans,
        kas: ke_kas,
        masuk: jumlah,
        kategori: kategori.id,
        jenis_transaksi: 'kas_mutasi'
      })
    } catch (e) {
      console.log(e);
      return false
    }

  });
  KasMutasi.afterDestroy(item => {
    const { no_trans }  = item
    sequelize.models.TransaksiKas.destroy({
      where: {
        no_trans: no_trans
      }
    }).then(transaksiKas => {
      return true
    }).catch( err => console.log(err))
  })

  KasMutasi.afterUpdate(item => {
    const { no_trans, dari_kas, ke_kas, jumlah, createdAt} = item
    sequelize.models.TransaksiKas.destroy({
      where: {
        no_trans: no_trans
      }
    }).then(async (transaksiKas) => {
      try {
        const kategori  = await sequelize.models.KategoriTransaksi.findOne({
          where: {
            name: 'kas_mutasi'
          }
        })
        await sequelize.models.TransaksiKas.create({
          no_trans,
          kas: dari_kas,
          keluar: jumlah,
          kategori: kategori.id,
          jenis_transaksi: 'kas_mutasi',
          createdAt
        })
        await sequelize.models.TransaksiKas.create({
          no_trans,
          kas: ke_kas,
          masuk: jumlah,
          kategori: kategori.id,
          jenis_transaksi: 'kas_mutasi',
          createdAt
        })
        return true
      } catch (e) {
        console.log(e);
        return false
      }
    }).then((transaksiKas) => {
      return true
    }).catch( err => console.log(err))
  })
  return KasMutasi;
};
