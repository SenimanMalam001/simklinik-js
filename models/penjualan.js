'use strict';
module.exports = (sequelize, DataTypes) => {
  var Penjualan = sequelize.define('Penjualan', {
    no_trans: DataTypes.STRING,
    penjamin: DataTypes.INTEGER,
    status_jual: DataTypes.STRING,
    subtotal: DataTypes.INTEGER,
    diskon: DataTypes.INTEGER,
    total_akhir: DataTypes.INTEGER,
    cara_bayar: DataTypes.INTEGER,
    jumlah_bayar: DataTypes.INTEGER,
    jumlah_kredit: DataTypes.INTEGER,
    userCreated: DataTypes.INTEGER,
    userEdited: DataTypes.INTEGER
  }, {});
  Penjualan.associate = function(models) {
    // associations can be defined here
    Penjualan.belongsTo(models.Penjamin, { foreignKey: 'penjamin' })
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
    const { no_trans }  = item
    sequelize.models.DetailPenjualan.destroy({
      where: {
        no_trans: no_trans
      },
      individualHooks: true
    }, {
      transaction: options.transaction,
    }).then(persediaan => {
      return options.transaction.commit()
    }).catch( err => {
      console.log(err)
      return options.transaction.rollback()
    })
  })
  Penjualan.afterCreate((item, options) => {
    const { userCreated, no_trans } = item
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
    }).then((detail) => {
      return sequelize.models.TbsPenjualan.destroy({
        where: {
          user: userCreated
        }
      },{ transaction: options.transaction})
    }).then((deleted) => {
      return options.transaction.commit()
    }).catch( err => {
      console.log(err);
      return options.transaction.rollback()
    })
  });
  Penjualan.afterUpdate((item, options) => {
    const { userEdited, no_trans } = item
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
          total_akhir
        })
      })
      return sequelize.models.DetailPenjualan.bulkCreate( detailPenjualan, { individualHooks: true, transaction: options.transaction})
    }).then((detail) => {
      return sequelize.models.TbsPenjualan.destroy({
        where: {
          user: userEdited
        }
      },{ transaction: options.transaction})
    }).then((deleted) => {
      return true
    }).catch( err => {
      console.log(err);
      return false
    })
  })
  return Penjualan;
};
