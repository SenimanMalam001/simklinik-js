const models = require('../models');

module.exports = {
  index: (req,res) => {
    models.Produk.all().then(produk => {
      res.status(200).json({
        message: 'Success Read Produk',
        data: produk
      })
    }).catch((err) => {
      res.status(500).json({
        message: 'Something Went Wrong'
      })
    })

  },
  create: (req, res) => {
    const { nama, kode, tipe, harga_beli, harga_jual_1, harga_jual_2, harga_jual_3 } = req.body
    models.Produk.create({
      nama,
      kode,
      tipe,
      harga_beli,
      harga_jual_1,
      harga_jual_2,
      harga_jual_3
    }).then((produk) => {
      res.status(201).json({
        message: 'Success Create Produk',
        data: produk
      })
    }).catch((err) => {
      res.status(500).json({
        message: 'Something Went Wrong',
      })
    })
  },
  update: (req, res) => {
    const { id } = req.params
    const { nama, kode, tipe, harga_beli, harga_jual_1, harga_jual_2, harga_jual_3 } = req.body
    models.Produk.findOne({
      where: { id: id}
    }).then((produk) => {
      if (produk) {
        produk.update({
          nama,
          kode,
          tipe,
          harga_beli,
          harga_jual_1,
          harga_jual_2,
          harga_jual_3
        }).then((updatedRuangan) => {
          res.status(200).json({
            message: 'Success Update Produk',
            data: updatedRuangan
          })
        }).catch((err) => {
          res.status(500).json({
            message: 'Something Went Wrong',
          })
        })
      } else {
        res.status(404).json({
          message: 'Data Not Found',
        })
      }
    }).catch((err) => {
      res.status(500).json({
        message: 'Something Went Wrong',
      })
    })
  },
  destroy: (req, res) => {
    const { id } = req.params
    models.Produk.findOne({
      where: {
        id: id
      }
    }).then((produk) => {
      produk.destroy().then(() => {
        res.status(200).json({
          message: 'Success Delete Produk',
          data: produk
        })
      }).catch((err) => {
        res.status(500).json({
          message: 'Something Went Wrong',
        })
      })
    }).catch((err) => {
      res.status(500).json({
        message: 'Something Went Wrong',
      })
    })
  },
};
