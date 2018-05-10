const models = require('../models');
const Op = require('sequelize').Op

module.exports = {
  find: (req,res) => {
    const { id } = req.params
    models.KategoriTransaksi.findOne({
      where: {
        id: id
      }
    }).then(kategoriTransaksi => {
      res.status(200).json({
        message: 'Success Read Kategori Transaksi',
        data: kategoriTransaksi
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

    models.KategoriTransaksi.count({
        where: {
          [Op.or]: [
            { name: {
              [Op.like]: `%${q}%`
            }}
          ]
        },
    }).then(count => {
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
      return models.KategoriTransaksi.all({
        where: {
          [Op.or]: [
            { name: {
              [Op.like]: `%${q}%`
            }}
          ]
        },
      })
    })
    .then(data => {
      const { pages } = pagination
      res.status(200).json({
        message: 'Success Read Kategori Transaksi',
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
  },
  update: (req, res) => {
    const { id } = req.params
    const { name } = req.body
    const display_name = name.toLowerCase().replace(' ','_')
    models.KategoriTransaksi.findOne({
      where: { id: id}
    }).then((kategoriTransaksi) => {
      if (kategoriTransaksi) {
        kategoriTransaksi.update({
          name,
          display_name
        }).then((updatedKategoriTransaksi) => {
          res.status(200).json({
            message: 'Success Update Kategori Transaksi',
            data: updatedKategoriTransaksi
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
