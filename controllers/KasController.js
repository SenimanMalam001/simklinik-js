const models = require('../models');
const Op = require('sequelize').Op

module.exports = {
  all: (req,res) => {
    models.Kas.all().then(kas => {
      res.status(200).json({
        message: 'Success Read Kas',
        data: kas
      })
    }).catch((err) => {
      res.status(500).json({
        message: 'Something Went Wrong'
      })
    })

  },
  find: (req,res) => {
    const { id } = req.params
    models.Kas.findOne({
      where: {
        id: id
      }
    }).then(kas => {
      res.status(200).json({
        message: 'Success Read Kas',
        data: kas
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
    models.Kas.count({
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
    }).then( pagination => {
      const { limit, offset} = pagination
      return models.Kas.all({
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
        limit,
        offset
      })
    }).then(data => {
      const { pages } = pagination
      res.status(200).json({
        message: 'Success Read Kas',
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
    const { nama, kode, default_kas  } = req.body
    models.Kas.create({
      nama,
      kode,
      default_kas
    }).then((kas) => {
      res.status(201).json({
        message: 'Success Create Kas',
        data: kas
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
    const { nama, kode, default_kas } = req.body
    models.Kas.findOne({
      where: { id: id}
    }).then((kas) => {
      if (kas) {
        kas.update({
          nama,
          kode,
          default_kas
        }).then((updatedRuangan) => {
          res.status(200).json({
            message: 'Success Update Kas',
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
    models.Kas.findOne({
      where: {
        id: id
      }
    }).then((kas) => {
      kas.destroy().then(() => {
        res.status(200).json({
          message: 'Success Delete Kas',
          data: kas
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
