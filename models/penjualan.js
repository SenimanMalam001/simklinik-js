'use strict';
module.exports = (sequelize, DataTypes) => {
  var Penjualan = sequelize.define('Penjualan', {
    no_trans: DataTypes.STRING,
    no_reg: DataTypes.STRING,
    penjamin: DataTypes.INTEGER,
    status_jual: DataTypes.STRING,
    subtotal: DataTypes.INTEGER,
    diskon: DataTypes.INTEGER,
    total_akhir: DataTypes.INTEGER,
    cara_bayar: DataTypes.INTEGER,
    jumlah_bayar: DataTypes.INTEGER,
    jumlah_kredit: DataTypes.INTEGER,
    keterangan: DataTypes.STRING,
    userCreated: DataTypes.INTEGER,
    userEdited: DataTypes.INTEGER
  }, {});
  Penjualan.associate = function(models) {
    // associations can be defined here
    Penjualan.belongsTo(models.Penjamin, { foreignKey: 'penjamin' })
    Penjualan.belongsTo(models.Registrasi, { foreignKey: 'no_reg' })
    Penjualan.belongsTo(models.User, { foreignKey: 'userCreated' })
    Penjualan.hasMany(models.PetugasPenjualan, { foreignKey: 'penjualan', sourceKey: 'no_trans'} )
    Penjualan.hasMany(models.DetailPenjualan, { foreignKey: 'no_trans', sourceKey: 'no_trans'} )
  };

  Penjualan.beforeCreate(async (item, options) => {
    try {
      //no trans
      const penjualan = await Penjualan.findOne({ order: [['createdAt', 'DESC']]},{ transaction: options.transaction})
      if (penjualan) {
        let { no_trans } = penjualan
        no_trans = no_trans.split('-')
        no_trans = Number(no_trans[1]) + 1
        no_trans = `JL-${no_trans}`
        item.no_trans = no_trans
      } else {
        item.no_trans = 'JL-1'
      }
    } catch (e) {
      console.log(e);
    }
  });
  Penjualan.afterDestroy((item, options) => {
    const { no_trans,id }  = item
    sequelize.models.DetailPenjualan.destroy({
      where: {
        no_trans: no_trans
      },
      individualHooks: true
    }, {
      transaction: options.transaction,
    }).then(detailPenjualan => {
      return sequelize.models.PetugasPenjualan.destroy({
        where: {
          penjualan: no_trans
        },
        individualHooks: true
      })
    }).then((result) => {
      return sequelize.models.KomisiPenjualan.destroy({
        where: {
          no_trans: no_trans
        }
      })
    }).then((result) => {
      return sequelize.models.TransaksiKas.destroy({
        where: {
          no_trans: no_trans
        }
      })
    }).then((result) => {
      return sequelize.models.Piutang.destroy({
        where: {
          no_penjualan: no_trans
        }
      })
    }).then((result) => {
      return sequelize.models.Registrasi.update({
        status_registrasi: 0
      },{
        where: {
          id: item.no_reg
        }
      })
    }).then(() => {
      return options.transaction.commit()
    }).catch( err => {
      console.log(err)
      return options.transaction.rollback()
    })
  })
  Penjualan.afterCreate((item, options) => {
    const { userCreated, no_trans, cara_bayar, jumlah_bayar, total_akhir, no_reg, penjamin } = item
    let terbayar = total_akhir - jumlah_bayar;
    let piutang
    jumlah_bayar > total_akhir ? terbayar = total_akhir : terbayar = jumlah_bayar
    jumlah_bayar < total_akhir ? piutang = total_akhir - jumlah_bayar : piutang = 0
    sequelize.models.TbsPenjualan.findAll({
      where: {
        user: userCreated
      }
    }).then((tbsPenjualan) => {
      const detailPenjualan = []
      tbsPenjualan.forEach((tbs) => {
        const { produk, harga_jual, jumlah,subtotal,diskon, total_akhir} = tbs
        detailPenjualan.push({
          no_trans,
          produk,
          harga_jual,
          jumlah,
          subtotal,
          diskon,
          total_akhir
        })
      })
      return sequelize.models.DetailPenjualan.bulkCreate( detailPenjualan, { individualHooks: true, transaction: options.transaction})
    }).then( async (detail) => {
      const { petugas } = options
      try {
        for (var i = 0; i < petugas.length; i++) {
          await sequelize.models.PetugasPenjualan.create({
            user: petugas[i],
            penjualan: no_trans
          }, { transaction: options.transaction})
        }
        for (var i = 0; i < detail.length; i++) {
          for (var j = 0; j < petugas.length; j++) {
            const komisi = await sequelize.models.Komisi.findOne({
              where: {
                user: petugas[j],
                produk: detail[i].produk
              },
              transaction: options.transaction
            })
            if (komisi) {
              await sequelize.models.KomisiPenjualan.create({
                no_trans,
                user: petugas[j],
                produk: detail[i].produk,
                jumlah: detail[i].jumlah,
                nilai_komisi: komisi.jumlah,
                total_komisi: Number(komisi.jumlah) * Number(detail[i].jumlah)
              },{transaction: options.transaction})
            }
          }
        }

      } catch (e) {
        console.log(e);
      }
    }).then(() => {
      return sequelize.models.TbsPenjualan.destroy({
        where: {
          user: userCreated
        }
      },{ transaction: options.transaction})
    }).then( async () => {
      try {
        const kategori  = await sequelize.models.KategoriTransaksi.findOne({
          where: {
            name: 'penjualan'
          }
        })
        if (terbayar > 0) {
           await sequelize.models.TransaksiKas.create({
            no_trans,
            kas: cara_bayar,
            masuk: terbayar,
            kategori: kategori.id,
            jenis_transaksi: 'penjualan'
          })
        }
        if (piutang > 0) {
          await sequelize.models.Piutang.create({
            no_penjualan: no_trans,
            penjamin,
            jumlah: piutang,
          })
        }
      } catch (e) {
        console.log(e);
        return options.transaction.rollback()
      }
    }).then(() => {
      return sequelize.models.Registrasi.update({
        status_registrasi: 1
      }, {
        where: {
          id: no_reg
        }
      })
    }).then(() => {
      return options.transaction.commit()
    }).catch( err => {
      console.log(err);
      return options.transaction.rollback()
    })
  });
  Penjualan.afterUpdate((item, options) => {
    const { userEdited, no_trans, cara_bayar, jumlah_bayar, total_akhir, no_reg, penjamin, createdAt } = item
    let terbayar = total_akhir - jumlah_bayar;
    let piutang
    jumlah_bayar > total_akhir ? terbayar = total_akhir : terbayar = jumlah_bayar
    jumlah_bayar < total_akhir ? piutang = total_akhir - jumlah_bayar : piutang = 0
    sequelize.models.DetailPenjualan.destroy({
      where: {
        no_trans: no_trans
      },
      individualHooks: true
    }, {
      transaction: options.transaction
    }).then(data => {
      return sequelize.models.TbsPenjualan.findAll({
        where: {
          user: userEdited
        }
      })
    }).then((tbsPenjualan) => {
      const detailPenjualan = []
      tbsPenjualan.forEach((tbs) => {
        const { produk, harga_jual, jumlah,subtotal,diskon, total_akhir} = tbs
        detailPenjualan.push({
          no_trans,
          produk,
          harga_jual,
          jumlah,
          subtotal,
          diskon,
          total_akhir,
          createdAt
        })
      })
      return sequelize.models.DetailPenjualan.bulkCreate( detailPenjualan, { individualHooks: true, transaction: options.transaction})
    }).then( async (detail) => {
      const { petugas } = options
      try {
        await sequelize.models.KomisiPenjualan.destroy({
          where: {
            no_trans
          }
        })
        await sequelize.models.PetugasPenjualan.destroy({
          where: {
            penjualan: no_trans
          }
        })
        for (var i = 0; i < petugas.length; i++) {
          await sequelize.models.PetugasPenjualan.create({
            user: petugas[i],
            penjualan: no_trans
          }, { transaction: options.transaction})
        }
        for (var i = 0; i < detail.length; i++) {
          for (var j = 0; j < petugas.length; j++) {
            const komisi = await sequelize.models.Komisi.findOne({
              where: {
                user: petugas[j],
                produk: detail[i].produk
              },
              transaction: options.transaction
            })
            if (komisi) {
              await sequelize.models.KomisiPenjualan.create({
                no_trans,
                user: petugas[j],
                produk: detail[i].produk,
                jumlah: detail[i].jumlah,
                nilai_komisi: komisi.jumlah,
                total_komisi: Number(komisi.jumlah) * Number(detail[i].jumlah),
                createdAt
              })
            }
          }
        }

      } catch (e) {
        console.log(e);
      }
    }).then(() => {
      return sequelize.models.TbsPenjualan.destroy({
        where: {
          user: userEdited
        }
      },{ transaction: options.transaction})
    }).then(() => {
      return sequelize.models.Registrasi.update({
        status_registrasi: 1
      }, {
        where: {
          id: no_reg
        }
      })
    }).then( async () => {
      try {
        await sequelize.models.TransaksiKas.destroy({
          where: {
            no_trans
          }
        })
        await sequelize.models.Piutang.destroy({
          where: {
            no_penjualan: no_trans
          }
        })
        const kategori  = await sequelize.models.KategoriTransaksi.findOne({
          where: {
            name: 'penjualan'
          }
        })
        if (terbayar > 0) {
           await sequelize.models.TransaksiKas.create({
            no_trans,
            kas: cara_bayar,
            masuk: terbayar,
            kategori: kategori.id,
            jenis_transaksi: 'penjualan',
            createdAt
          })
        }
        if (piutang > 0) {
          await sequelize.models.Piutang.create({
            no_penjualan: no_trans,
            penjamin,
            jumlah: piutang,
            createdAt
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
  return Penjualan;
};
