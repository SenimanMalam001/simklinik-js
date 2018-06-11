const models = require('../models');
const Op = require('sequelize').Op

module.exports = {
  interval: (req,res) => {
    const { dari_tanggal, sampai_tanggal, produk} = req.query
    const where = {
        createdAt: {
          [Op.gte]: new Date(Number(dari_tanggal)),
          [Op.lte]: new Date(Number(sampai_tanggal))
        },
        produk
      }
    models.Persediaan.all({
      where,
      include: [
        {
          model: models.Produk
        },
      ]
    }).then(async data => {
      let persediaan = []
      data.forEach(  (data) => {
        persediaan.push({
          id: data.id,
          no_trans: data.no_trans,
          produk: data.Produk.nama,
          masuk: data.masuk,
          keluar: data.keluar,
          jenis_transaksi: data.jenis_transaksi,
          createdAt: data.createdAt,
        })
      })
      try {
        const produkmasuk = await models.Persediaan.sum('masuk',{
          where: {
            produk,
            createdAt: {
              [Op.lt]: new Date(Number(dari_tanggal)),
            }
          }
        })
        const produkkeluar = await models.Persediaan.sum('keluar',{
          where: {
            produk,
            createdAt: {
              [Op.lt]: new Date(Number(dari_tanggal)),
            }
          }
        })
        const stok_akhir = Number(produkmasuk) - Number(produkkeluar)
        res.status(200).json({
          message: 'Success Read Persediaan',
          data: persediaan,
          stok_akhir: stok_akhir ? stok_akhir : 0
        })
      } catch (e) {
        console.log(e);
        res.status(500).json({
          message: 'Something Went Wrong'
        })
      }
    }).catch((err) => {
      console.log(err);
      res.status(500).json({
        message: 'Something Went Wrong'
      })
    })
  },
};
