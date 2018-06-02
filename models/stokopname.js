'use strict';
module.exports = (sequelize, DataTypes) => {
  var StokOpname = sequelize.define('StokOpname', {
    no_trans: DataTypes.STRING,
    produk: DataTypes.INTEGER,
    stok_komputer: DataTypes.INTEGER,
    stok_akhir: DataTypes.INTEGER,
    selisih: DataTypes.INTEGER,
    nilai_selisih: DataTypes.INTEGER
  }, {});
  StokOpname.associate = function(models) {
    // associations can be defined here
    StokOpname.belongsTo(models.Produk, { foreignKey: 'produk' })
  };
  StokOpname.beforeCreate(async (item, options) => {
    try {
      const stokOpname = await StokOpname.findOne({ order: [['createdAt', 'DESC']]})
      if (stokOpname) {
        let { no_trans } = stokOpname
        no_trans = no_trans.split('-')
        no_trans = Number(no_trans[1]) + 1
        no_trans = `SO-${no_trans}`
        item.no_trans = no_trans
      } else {
        item.no_trans = 'SO-1'
      }
      //stok
      let masuk = await sequelize.models.Persediaan.sum('masuk',{
        where: {
          produk: item.produk
        }
      })
      masuk == NaN ? masuk = 0 : masuk = Number(masuk)
      let keluar = await sequelize.models.Persediaan.sum('keluar',{
        where: {
          produk: item.produk
        }
      })
      keluar == NaN ? keluar = 0 : keluar = Number(keluar)
      item.stok_komputer = masuk - keluar
      item.selisih = item.stok_akhir - item.stok_komputer
      // nilai selisih
      const { produk } = item
      const total_nilai_masuk = await sequelize.models.Persediaan.sum('total_nilai',{
        where: {
          produk,
          keluar: 0
        }
      })
      const total_masuk = await sequelize.models.Persediaan.sum('masuk',{
        where: {
          produk,
          keluar: 0
        }
      })
      const hpp = Number(total_nilai_masuk) / Number(total_masuk)
      item.nilai_selisih = hpp * item.selisih
      return item
    } catch (e) {
      console.log(e);
    }
  });

  StokOpname.afterCreate((item) => {
    const { no_trans, produk, selisih, nilai_selisih} = item
    if (selisih < 0) {
      sequelize.models.Persediaan.create({
        no_trans,
        produk,
        keluar: Math.abs(selisih),
        nilai: Math.abs(nilai_selisih) / Math.abs(selisih),
        total_nilai: Math.abs(nilai_selisih),
        jenis_transaksi: 'stok_opname'
      })

    } else if (item.selisih > 0) {
      sequelize.models.Persediaan.create({
        no_trans,
        produk,
        masuk: selisih,
        nilai: nilai_selisih / selisih,
        total_nilai: nilai_selisih,
        jenis_transaksi: 'stok_opname'
      })
    }
  });

  StokOpname.afterDestroy(item => {
    const { no_trans }  = item
    sequelize.models.Persediaan.destroy({
      where: {
        no_trans: no_trans
      }
    }).then(persediaan => {
      return true
    }).catch( err => console.log(err))
  })

  StokOpname.afterUpdate(item => {
    const { no_trans, produk, selisih} = item
    sequelize.models.Persediaan.destroy({
      where: {
        no_trans: no_trans
      }
    }).then(persediaan => {
      if (selisih < 0) {
        return sequelize.models.Persediaan.create({
          no_trans,
          produk,
          keluar: Math.abs(selisih),
          jenis_transaksi: 'stok_opname'
        })

      } else if (item.selisih > 0) {
        return sequelize.models.Persediaan.create({
          no_trans,
          produk,
          masuk: selisih,
          jenis_transaksi: 'stok_opname'
        })
      }
    }).then((persediaan) => {
      return true
    }).catch( err => console.log(err))
  })
  return StokOpname;
};
