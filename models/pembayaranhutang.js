'use strict';
module.exports = (sequelize, DataTypes) => {
  var PembayaranHutang = sequelize.define('PembayaranHutang', {
    no_trans: DataTypes.STRING,
    jumlah_bayar: DataTypes.INTEGER,
    supplier: DataTypes.INTEGER,
    dari_tanggal: DataTypes.DATE,
    sampai_tanggal: DataTypes.DATE,
    cara_bayar: DataTypes.INTEGER,
    userCreated: DataTypes.INTEGER,
    userEdited: DataTypes.INTEGER
  }, {});
  PembayaranHutang.associate = function(models) {
    // associations can be defined here
    PembayaranHutang.belongsTo(models.Supplier, { foreignKey: 'supplier' })
    PembayaranHutang.belongsTo(models.Kas, { foreignKey: 'cara_bayar' })
  };
  PembayaranHutang.beforeCreate(async (item, options) => {
    try {
      //no trans
      const pembayaranHutang = await PembayaranHutang.findOne({ order: [['createdAt', 'DESC']]},{ transaction: options.transaction})
      if (pembayaranHutang) {
        let { no_trans } = pembayaranHutang
        no_trans = no_trans.split('-')
        no_trans = Number(no_trans[1]) + 1
        no_trans = `PH-${no_trans}`
        item.no_trans = no_trans
      } else {
        item.no_trans = 'PH-1'

      }
      // jumlah bayar
      const { supplier, dari_tanggal, sampai_tanggal} = item
      const jumlah_hutang = await sequelize.models.Hutang.sum('jumlah',{
        where: {
          supplier,
          createdAt: {
            [sequelize.Op.gte]: new Date(dari_tanggal),
            [sequelize.Op.lte]: new Date(sampai_tanggal)
          },
          status_bayar: 0
        }
      })
      item.jumlah_bayar = isNaN(jumlah_hutang) ? 0 : jumlah_hutang
    } catch (e) {
      console.log(e);
    }
  });

  PembayaranHutang.afterCreate((item, options) => {
    const { supplier, dari_tanggal, sampai_tanggal,no_trans, cara_bayar, jumlah_bayar} = item
    sequelize.models.Hutang.update({
      status_bayar: 1,
      no_pembayaran: item.no_trans
    }, {
      where: {
        supplier,
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
            name: 'pembayaran_hutang'
          }
        })
        return sequelize.models.TransaksiKas.create({
          no_trans,
          kas: cara_bayar,
          kategori: kategori.id,
          keluar: jumlah_bayar,
          jenis_transaksi: 'pembayaran_hutang'
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
  PembayaranHutang.afterDestroy((item, options) => {
    const { supplier, dari_tanggal, sampai_tanggal, no_trans} = item
    sequelize.models.Hutang.update({
      status_bayar: 0,
      no_pembayaran: null
    }, {
      where: {
        supplier,
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
  return PembayaranHutang;
};
