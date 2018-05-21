const models = require('../models');
const Op = require('sequelize').Op

module.exports = {
  all: (req,res) => {
    const { id } = req.params
    models.Supplier.all().then(user => {
      res.status(200).json({
        message: 'Success Read Supplier',
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
    models.Supplier.findOne({
      where: {
        id: id
      }
    }).then(user => {
      res.status(200).json({
        message: 'Success Read Supplier',
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
    models.Supplier.count({
        where: {
          [Op.or]: [
            { no_telp: {
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
    }).then( pagination => {
      const { limit, offset} = pagination
      return models.Supplier.all({
          where: {
            [Op.or]: [
              { no_telp: {
                [Op.like]: `%${q}%`
              }},
              { nama: {
                [Op.like]: `%${q}%`
              }},
            ]
          },
          limit,
          offset
      })
    })
    .then(data => {
      const { pages } = pagination
      res.status(200).json({
        message: 'Success Read Supplier',
        data: {
          data,
          pages
        }
      })
    }).catch((err) => {
      console.log(err);
      res.status(500).json({
        message: 'Something Went Wrong'
      })
    })

  },
  create: (req, res) => {
    const { nama, alamat, no_telp } = req.body
    models.Supplier.create({
      nama,
      alamat,
      no_telp
    }).then((supplier) => {
      res.status(201).json({
        message: 'Success Create Supplier',
        data: supplier
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
    const { nama, alamat, no_telp } = req.body
    models.Supplier.findOne({
      where: { id: id}
    }).then((supplier) => {
      if (supplier) {
        supplier.update({
          nama,
          alamat,
          no_telp
        }).then((updatedRuangan) => {
          res.status(200).json({
            message: 'Success Update Supplier',
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
      console.log(err);
      res.status(500).json({
        message: 'Something Went Wrong',
      })
    })
  },
  destroy: (req, res) => {
    const { id } = req.params
    models.Supplier.findOne({
      where: {
        id: id
      }
    }).then((supplier) => {
      supplier.destroy().then(() => {
        res.status(200).json({
          message: 'Success Delete Supplier',
          data: supplier
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
