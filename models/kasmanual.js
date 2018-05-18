'use strict';
module.exports = (sequelize, DataTypes) => {
  var KasManual = sequelize.define('KasManual', {
    no_trans: DataTypes.STRING,
    kas: DataTypes.INTEGER,
    kategori: DataTypes.INTEGER,
    jumlah: DataTypes.INTEGER,
    jenis: DataTypes.STRING,
    keterangan: DataTypes.STRING
  }, {});
  KasManual.associate = function(models) {
    // associations can be defined here
    KasManual.belongsTo(models.Kas, { foreignKey: 'kas' })
    KasManual.belongsTo(models.KategoriTransaksi, { foreignKey: 'kategori' })
  };
  KasManual.beforeCreate(async (item, options) => {
    try {
      //no trans
      const kasManual = await KasManual.findOne({ order: [['createdAt', 'DESC']]})
      if (kasManual) {
        let { no_trans } = kasManual
        no_trans = no_trans.split('-')
        no_trans = Number(no_trans[1]) + 1
        no_trans = `KM-${no_trans}`
        item.no_trans = no_trans
      } else {
        item.no_trans = 'KM-1'
      }
    } catch (e) {
      console.log(e);
    }
  });
  KasManual.afterCreate((item) => {
    const { no_trans, kas, jumlah, jenis, kategori} = item
    if (jenis === 'masuk') {
      sequelize.models.TransaksiKas.create({
        no_trans,
        kas,
        kategori,
        masuk: jumlah,
        jenis_transaksi: 'kas_masuk'
      })
    } else {
      sequelize.models.TransaksiKas.create({
        no_trans,
        kas,
        kategori,
        keluar: jumlah,
        jenis_transaksi: 'kas_keluar'
      })
    }
  });
  KasManual.afterDestroy(item => {
    const { no_trans }  = item
    sequelize.models.TransaksiKas.destroy({
      where: {
        no_trans: no_trans
      }
    }).then(transaksiKas => {
      return true
    }).catch( err => console.log(err))
  })
  KasManual.afterUpdate(item => {
    const { no_trans, kas, jumlah, jenis, kategori, createdAt} = item
    sequelize.models.TransaksiKas.destroy({
      where: {
        no_trans: no_trans
      }
    }).then(transaksiKas => {
      if (jenis === 'masuk') {
        sequelize.models.TransaksiKas.create({
          no_trans,
          kas,
          kategori,
          masuk: jumlah,
          jenis_transaksi: 'kas_masuk',
          createdAt
        })
      } else {
        sequelize.models.TransaksiKas.create({
          no_trans,
          kas,
          kategori,
          keluar: jumlah,
          jenis_transaksi: 'kas_keluar',
          createdAt
        })
    }
  }).then((transaksiKas) => {
      return true
    }).catch( err => console.log(err))
  })
  return KasManual;
};
