'use strict';
module.exports = (sequelize, DataTypes) => {
  var Pembelian = sequelize.define('Pembelian', {
    no_trans: DataTypes.STRING,
    supplier: DataTypes.INTEGER,
    no_faktur_supplier: DataTypes.STRING,
    status_beli: DataTypes.STRING,
    subtotal: DataTypes.INTEGER,
    diskon: DataTypes.INTEGER,
    total_akhir: DataTypes.INTEGER,
    cara_bayar: DataTypes.INTEGER,
    jumlah_bayar: DataTypes.INTEGER,
    jumlah_kredit: DataTypes.INTEGER,
    userCreated: DataTypes.INTEGER,
    userEdited: DataTypes.INTEGER,
  }, {});
  Pembelian.associate = function(models) {
    // associations can be defined here
    Pembelian.belongsTo(models.Supplier, { foreignKey: 'supplier' })
    Pembelian.hasMany(models.DetailPembelian, { foreignKey: 'no_trans', sourceKey: 'no_trans'} )
  };
  Pembelian.beforeCreate(async (item, options) => {
    try {
      //no trans
      const pembelian = await Pembelian.findOne({ order: [['createdAt', 'DESC']]},{ transaction: options.transaction})
      if (pembelian) {
        let { no_trans } = pembelian
        no_trans = no_trans.split('-')
        no_trans = Number(no_trans[1]) + 1
        no_trans = `BL-${no_trans}`
        item.no_trans = no_trans
      } else {
        item.no_trans = 'BL-1'
      }
    } catch (e) {
      console.log(e);
    }
  });
  Pembelian.afterDestroy((item, options) => {
    const { no_trans }  = item
    
    sequelize.models.DetailPembelian.destroy({
      where: {
        no_trans: no_trans
      },
      individualHooks: true
    }, {
      transaction: options.transaction,
    }).then(()=> {
      return sequelize.models.TransaksiKas.destroy({
        where: {
          no_trans: no_trans
        },
      }, {
        transaction: options.transaction
      })
    }).then(() => {
      return options.transaction.commit()
    }).catch( err => {
      console.log(err)
      return options.transaction.rollback()
    })
  })
  Pembelian.afterCreate((item, options) => {
    const { userCreated, no_trans, cara_bayar, jumlah_bayar, total_akhir, supplier } = item
    let terbayar = total_akhir - jumlah_bayar;
    let hutang
    jumlah_bayar > total_akhir ? terbayar = total_akhir : terbayar = jumlah_bayar
    jumlah_bayar < total_akhir ? hutang = total_akhir - jumlah_bayar : hutang = 0
    sequelize.models.TbsPembelian.findAll({
      where: {
        user: userCreated
      }
    }).then((tbsPembelian) => {
      const detailPembelian = []
      tbsPembelian.forEach((tbs) => {
        const { produk, harga_beli, jumlah,subtotal,diskon, total_akhir} = tbs
        detailPembelian.push({
          no_trans,
          produk,
          harga_beli,
          jumlah,
          subtotal,
          diskon,
          total_akhir
        })
      })
      return sequelize.models.DetailPembelian.bulkCreate( detailPembelian, { individualHooks: true, transaction: options.transaction})
    }).then((detail) => {
      return sequelize.models.TbsPembelian.destroy({
        where: {
          user: userCreated
        }
      },{ transaction: options.transaction})
    }).then( async () => {
      try {
        const kategori  = await sequelize.models.KategoriTransaksi.findOne({
          where: {
            name: 'pembelian'
          }
        })
        if (terbayar > 0) {
           await sequelize.models.TransaksiKas.create({
            no_trans,
            kas: cara_bayar,
            keluar: terbayar,
            kategori: kategori.id,
            jenis_transaksi: 'pembelian'
          })
        }
        if (hutang > 0) {
          await sequelize.models.Hutang.create({
            no_pembelian: no_trans,
            supplier,
            jumlah: hutang,
          })
        }
      } catch (e) {
        console.log(e);
        return options.transaction.rollback()
      }
    }).then((deleted) => {
      return options.transaction.commit()
    }).catch( err => {
      console.log(err);
      return options.transaction.rollback()
    })
  });
  Pembelian.afterUpdate((item, options) => {
    const { userEdited, no_trans, cara_bayar, jumlah_bayar, total_akhir, supplier } = item
    let terbayar = total_akhir - jumlah_bayar;
    let hutang
    jumlah_bayar > total_akhir ? terbayar = total_akhir : terbayar = jumlah_bayar
    jumlah_bayar < total_akhir ? hutang = total_akhir - jumlah_bayar : hutang = 0
    sequelize.models.DetailPembelian.destroy({
      where: {
        no_trans: no_trans
      },
      individualHooks: true
    }, {
      transaction: options.transaction
    }).then(data => {
      return sequelize.models.TbsPembelian.findAll({
        where: {
          user: userEdited
        }
      })
    }).then((tbsPembelian) => {
      const detailPembelian = []
      tbsPembelian.forEach((tbs) => {
        const { produk, harga_beli, jumlah,subtotal,diskon, total_akhir} = tbs
        detailPembelian.push({
          no_trans,
          produk,
          harga_beli,
          jumlah,
          subtotal,
          diskon,
          total_akhir
        })
      })
      return sequelize.models.DetailPembelian.bulkCreate( detailPembelian, { individualHooks: true, transaction: options.transaction})
    }).then((detail) => {
      return sequelize.models.TbsPembelian.destroy({
        where: {
          user: userEdited
        }
      },{ transaction: options.transaction})
    }).then( async () => {
      try {
        await sequelize.models.TransaksiKas.destroy({
          where: {
            no_trans
          }
        })
        await sequelize.models.Hutang.destroy({
          where: {
            no_pembelian: no_trans
          }
        })
        const kategori  = await sequelize.models.KategoriTransaksi.findOne({
          where: {
            name: 'pembelian'
          }
        })
        if (terbayar > 0) {
           await sequelize.models.TransaksiKas.create({
            no_trans,
            kas: cara_bayar,
            keluar: terbayar,
            kategori: kategori.id,
            jenis_transaksi: 'pembelian'
          })
        }
        if (hutang > 0) {
          await sequelize.models.Hutang.create({
            no_pembelian: no_trans,
            supplier,
            jumlah: hutang,
          })
        }
      } catch (e) {
        console.log(e);
        return options.transaction.rollback()
      }
    }).then((deleted) => {
      return true
    }).catch( err => {
      console.log(err);
      return false
    })
  })
  return Pembelian;
};
