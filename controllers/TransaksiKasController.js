const models = require('../models');
const Op = require('sequelize').Op

module.exports = {
  interval: (req,res) => {
    const { dari_tanggal, sampai_tanggal, kas} = req.query
    let where
    if (kas) {
      where = {
        createdAt: {
          [Op.gte]: new Date(Number(dari_tanggal)),
          [Op.lte]: new Date(Number(sampai_tanggal))
        },
        kas
      }
    } else {
      where = {
        createdAt: {
          [Op.gte]: new Date(Number(dari_tanggal)),
          [Op.lte]: new Date(Number(sampai_tanggal))
        },
      }
    }
    models.TransaksiKas.all({
      where,
      include: [
        {
          model: models.Kas
        },
        {
          model: models.KategoriTransaksi
        }
      ]
    }).then(async data => {
      let transaksiKas = []
      data.forEach(  (data) => {
        transaksiKas.push({
          id: data.id,
          no_trans: data.no_trans,
          kas: data.Ka.nama,
          kategori: data.KategoriTransaksi.name,
          masuk: data.masuk,
          keluar: data.keluar,
          jenis_transaksi: data.jenis_transaksi,
        })
      })
      try {
        const kasmasuk = await models.TransaksiKas.sum('masuk',{
          where: {
            kas,
            createdAt: {
              [Op.lt]: new Date(Number(dari_tanggal)),
            }
          }
        })
        const kaskeluar = await models.TransaksiKas.sum('keluar',{
          where: {
            kas,
            createdAt: {
              [Op.lt]: new Date(Number(dari_tanggal)),
            }
          }
        })
        res.status(200).json({
          message: 'Success Read Transaksi Kas',
          data: transaksiKas,
          posisi_kas: Number(kasmasuk) - Number(kaskeluar)
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
