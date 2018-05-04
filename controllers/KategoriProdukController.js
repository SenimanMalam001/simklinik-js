const models = require('../models');

module.exports = {
  index: (req,res) => {
    models.KategoriProduk.all().then(user => {
      res.status(200).json({
        message: 'Success Read Kategori Produk',
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
    models.KategoriProduk.create({
      name,
      display_name
    }).then((kategoriProduk) => {
      res.status(201).json({
        message: 'Success Create Kategori Produk',
        data: kategoriProduk
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
    models.KategoriProduk.findOne({
      where: { id: id}
    }).then((user) => {
      if (user) {
        user.update({
          name,
          display_name
        }).then((updatedKategoriProduk) => {
          res.status(200).json({
            message: 'Success Update Kategori Produk',
            data: updatedKategoriProduk
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
    models.KategoriProduk.findOne({
      where: {
        id: id
      }
    }).then((kategoriProduk) => {
      kategoriProduk.destroy().then(() => {
        res.status(200).json({
          message: 'Success Delete Kategori Produk',
          data: kategoriProduk
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
