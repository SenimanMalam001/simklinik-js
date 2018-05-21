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
    }).then(persediaan => {
      return options.transaction.commit()
    }).catch( err => {
      console.log(err)
      return options.transaction.rollback()
    })
  })
  Pembelian.afterCreate((item, options) => {
    const { userCreated, no_trans } = item
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
    }).then((deleted) => {
      return options.transaction.commit()
    }).catch( err => {
      console.log(err);
      return options.transaction.rollback()
    })
  });
  Pembelian.afterUpdate((item, options) => {
    const { userEdited, no_trans } = item
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
    }).then((deleted) => {
      return true
    }).catch( err => {
      console.log(err);
      return false
    })
  })
  return Pembelian;
};
