const models = require('../models');
const Op = require('sequelize').Op

module.exports = {
  all: (req,res) => {
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
  find: (req,res) => {
    const { id } = req.params
    models.Produk.findOne({
      where: {
        id: id
      }
    }).then(user => {
      res.status(200).json({
        message: 'Success Read Produk',
        data: user
      })
    }).catch((err) => {
      res.status(500).json({
        message: 'Something Went Wrong'
      })
    })

  },
  index: (req,res) => {
    let { q, page } = req.query
    if (!q) {
      q = ''
    }
    if (!page) {
      page = 1
    }
    let pagination
    let limit = 10
    let offset = 0
    models.Produk.count({
        where: {
          [Op.or]: [
            { kode: {
              [Op.like]: `%${q}%`
            }},
            { nama: {
              [Op.like]: `%${q}%`
            }},
          ]
        },
    }).then( count => {
      let pages = Math.ceil(count / limit)
      offset = limit * (page - 1)
      pagination = {
        limit,
        offset,
        pages,
        page
      }
      return pagination
    }).then(pagination => {
      const { limit, offset} = pagination
      return models.Produk.all({
        where: {
          [Op.or]: [
            { kode: {
              [Op.like]: `%${q}%`
            }},
            { nama: {
              [Op.like]: `%${q}%`
            }},
          ]
        },
      })
    }).then(data => {
      const { pages } = pagination
      res.status(200).json({
        message: 'Success Read Produk',
        data: {
          data,
          pages
        }
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
      if (err.errors) {
        const message = err.errors[0].message
        res.status(403).json({
          message: message,
        })
      } else {
        res.status(500).json({
          message: 'Something Went Wrong',
        })
      }
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
          if (err.errors[0].message) {
            const message = err.errors[0].message
            res.status(403).json({
              message: message,
            })
          } else {
            res.status(500).json({
              message: 'Something Went Wrong',
            })
          }
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
