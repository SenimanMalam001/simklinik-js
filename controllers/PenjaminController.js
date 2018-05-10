const models = require('../models');
const Op = require('sequelize').Op

module.exports = {
  find: (req,res) => {
    const { id } = req.params
    models.Penjamin.findOne({
      where: {
        id: id
      }
    }).then(user => {
      res.status(200).json({
        message: 'Success Read Penjamin',
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
    models.Penjamin.count({
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
      return models.Penjamin.all({
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
    }).then(data => {
      const { pages } = pagination
      res.status(200).json({
        message: 'Success Read Penjamin',
        data: {
          data,
          pages
        }
      })
    }).catch((err) => {
      console.log(err)
      res.status(500).json({
        message: 'Something Went Wrong'
      })
    })

  },
  create: (req, res) => {
    const { nama, alamat, level, no_telp } = req.body
    models.Penjamin.create({
      nama,
      alamat,
      level,
      no_telp
    }).then((penjamin) => {
      res.status(201).json({
        message: 'Success Create Penjamin',
        data: penjamin
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
    const { nama, alamat, level, no_telp } = req.body
    models.Penjamin.findOne({
      where: { id: id}
    }).then((penjamin) => {
      if (penjamin) {
        penjamin.update({
          nama,
          alamat,
          level,
          no_telp
        }).then((updatedRuangan) => {
          res.status(200).json({
            message: 'Success Update Penjamin',
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
    models.Penjamin.findOne({
      where: {
        id: id
      }
    }).then((penjamin) => {
      penjamin.destroy().then(() => {
        res.status(200).json({
          message: 'Success Delete Penjamin',
          data: penjamin
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
