const models = require('../models');

module.exports = {
  index: (req,res) => {
    models.KategoriTransaksi.all().then(user => {
      res.status(200).json({
        message: 'Success Read Kategori Transaksi',
        data: user
      })
    }).catch((err) => {
      res.status(500).json({
        message: 'Something Went Wrong'
      })
    })

  },
  create: (req, res) => {
    const { name } = req.body
    const display_name = name.toLowerCase().replace(' ','_')
    models.KategoriTransaksi.create({
      name,
      display_name
    }).then((kategoriTransaksi) => {
      res.status(201).json({
        message: 'Success Create Kategori Transaksi',
        data: kategoriTransaksi
      })
    }).catch((err) => {
      res.status(500).json({
        message: 'Something Went Wrong',
      })
    })
  },
  update: (req, res) => {
    const { id } = req.params
    const { name } = req.body
    const display_name = name.toLowerCase().replace(' ','_')
    models.KategoriTransaksi.findOne({
      where: { id: id}
    }).then((user) => {
      if (user) {
        user.update({
          name,
          display_name
        }).then((updatedKategoriTransaksi) => {
          res.status(200).json({
            message: 'Success Update Kategori Transaksi',
            data: updatedKategoriTransaksi
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
    models.KategoriTransaksi.findOne({
      where: {
        id: id
      }
    }).then((kategoriTransaksi) => {
      kategoriTransaksi.destroy().then(() => {
        res.status(200).json({
          message: 'Success Delete Kategori Transaksi',
          data: kategoriTransaksi
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
