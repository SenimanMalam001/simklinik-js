const models = require('../models');
const Op = require('sequelize').Op

module.exports = {
  all: (req,res) => {
    const { id } = req.params
    models.Ruangan.findAll().then(user => {
      res.status(200).json({
        message: 'Success Read Ruangan',
        data: user
      })
    }).catch((err) => {
      res.status(500).json({
        message: 'Something Went Wrong'
      })
    })

  },
  find: (req,res) => {
    const { id } = req.params
    models.Ruangan.findOne({
      where: {
        id: id
      }
    }).then(user => {
      res.status(200).json({
        message: 'Success Read Ruangan',
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
    models.Ruangan.count({
        where: {
          [Op.or]: [
            { nama: {
              [Op.like]: `%${q}%`
            }},
            { kode: {
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
      return models.Ruangan.all({
        where: {
          [Op.or]: [
            { nama: {
              [Op.like]: `%${q}%`
            }},
            { kode: {
              [Op.like]: `%${q}%`
            }},
          ]
        },
        limit,
        offset
      })
    }).then(data => {
      const { pages } = pagination
      res.status(200).json({
        message: 'Success Read Ruangan',
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
    const { nama, kode, jumlah } = req.body
    models.Ruangan.create({
      nama,
      kode,
      jumlah
    }).then((poli) => {
      res.status(201).json({
        message: 'Success Create Ruangan',
        data: poli
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
    const { nama, kode, jumlah } = req.body
    models.Ruangan.findOne({
      where: { id: id}
    }).then((poli) => {
      if (poli) {
        poli.update({
          nama,
          kode,
          jumlah
        }).then((updatedRuangan) => {
          res.status(200).json({
            message: 'Success Update Ruangan',
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
    models.Ruangan.findOne({
      where: {
        id: id
      }
    }).then((poli) => {
      poli.destroy().then(() => {
        res.status(200).json({
          message: 'Success Delete Ruangan',
          data: poli
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
