'use strict';
module.exports = (sequelize, DataTypes) => {
  var PembayaranPiutang = sequelize.define('PembayaranPiutang', {
    no_trans: DataTypes.STRING,
    jumlah_bayar: DataTypes.INTEGER,
    penjamin: DataTypes.INTEGER,
    dari_tanggal: DataTypes.DATE,
    sampai_tanggal: DataTypes.DATE,
    cara_bayar: DataTypes.INTEGER,
    userCreated: DataTypes.INTEGER,
    userEdited: DataTypes.INTEGER
  }, {});
  PembayaranPiutang.associate = function(models) {
    // associations can be defined here
    PembayaranPiutang.belongsTo(models.Penjamin, { foreignKey: 'penjamin' })
    PembayaranPiutang.belongsTo(models.Kas, { foreignKey: 'cara_bayar' })
  };
  PembayaranPiutang.beforeCreate(async (item, options) => {
    try {
      //no trans
      const pembayaranPiutang = await PembayaranPiutang.findOne({ order: [['createdAt', 'DESC']]},{ transaction: options.transaction})
      if (pembayaranPiutang) {
        let { no_trans } = pembayaranPiutang
        no_trans = no_trans.split('-')
        no_trans = Number(no_trans[1]) + 1
        no_trans = `BP-${no_trans}`
        item.no_trans = no_trans
      } else {
        item.no_trans = 'BP-1'

      }
      // jumlah bayar
      const { penjamin, dari_tanggal, sampai_tanggal} = item
      const jumlah_piutang = await sequelize.models.Piutang.sum('jumlah',{
        where: {
          penjamin,
          createdAt: {
            [sequelize.Op.gte]: new Date(dari_tanggal),
            [sequelize.Op.lte]: new Date(sampai_tanggal)
          },
          status_bayar: 0
        }
      })
      item.jumlah_bayar = isNaN(jumlah_piutang) ? 0 : jumlah_piutang
    } catch (e) {
      console.log(e);
    }
  });
  PembayaranPiutang.afterCreate((item, options) => {
    const { penjamin, dari_tanggal, sampai_tanggal, no_trans, cara_bayar, jumlah_bayar} = item
    sequelize.models.Piutang.update({
      status_bayar: 1,
      no_pembayaran: item.no_trans
    }, {
      where: {
        penjamin,
        createdAt: {
          [sequelize.Op.gte]: new Date(dari_tanggal),
          [sequelize.Op.lte]: new Date(sampai_tanggal)
        },
        status_bayar: 0
      },
      transaction: options.transaction
    }).then(async () => {
      try {
        const kategori  = await sequelize.models.KategoriTransaksi.findOne({
          where: {
            name: 'pembayaran_piutang'
          }
        })
        return sequelize.models.TransaksiKas.create({
          no_trans,
          kas: cara_bayar,
          kategori: kategori.id,
          masuk: jumlah_bayar,
          jenis_transaksi: 'pembayaran_piutang'
        })
      } catch (e) {
        console.log(e);
        return options.transaction.rollback()
      }
    }).then(() => {
      return options.transaction.commit()
    }).catch((err) => {
      console.log(err);
      return options.transaction.rollback()
    })

  })
  PembayaranPiutang.afterDestroy((item, options) => {
    const { penjamin, dari_tanggal, sampai_tanggal, no_trans} = item
    sequelize.models.Piutang.update({
      status_bayar: 0,
      no_pembayaran: null
    }, {
      where: {
        penjamin,
        createdAt: {
          [sequelize.Op.gte]: new Date(dari_tanggal),
          [sequelize.Op.lte]: new Date(sampai_tanggal)
        },
        status_bayar: 1
      },
      transaction: options.transaction
    }).then(() => {
      return sequelize.models.TransaksiKas.destroy({
        where: {
          no_trans
        },
        transaction: options.transaction
      })
    }).then(() => {
      return options.transaction.commit()
    }).catch((err) => {
      console.log(err);
      return options.transaction.rollback()
    })

  })
  return PembayaranPiutang;
};
