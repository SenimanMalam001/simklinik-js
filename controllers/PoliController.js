const models = require('../models');
const Op = require('sequelize').Op

module.exports = {
  find: (req,res) => {
    const { id } = req.params
    models.Poli.findOne({
      where: {
        id: id
      }
    }).then(user => {
      res.status(200).json({
        message: 'Success Read Poli',
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
    models.Poli.count({
        where: {
          [Op.or]: [
            { name: {
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
    }).then((pagination) => {
      const { limit, offset } = pagination
      return models.Poli.all({
        where: {
          [Op.or]: [
            { name: {
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
        message: 'Success Read Poli',
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
    models.Poli.create({
      name,
      display_name
    }).then((poli) => {
      res.status(201).json({
        message: 'Success Create Poli',
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
    const { name } = req.body
    const display_name = name.toLowerCase().replace(' ','_')
    models.Poli.findOne({
      where: { id: id}
    }).then((poli) => {
      if (poli) {
        poli.update({
          name,
          display_name
        }).then((updatedKategoriTransaksi) => {
          res.status(200).json({
            message: 'Success Update Poli',
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
      res.status(500).json({
        message: 'Something Went Wrong',
      })
    })
  },
  destroy: (req, res) => {
    const { id } = req.params
    models.Poli.findOne({
      where: {
        id: id
      }
    }).then((poli) => {
      poli.destroy().then(() => {
        res.status(200).json({
          message: 'Success Delete Poli',
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
