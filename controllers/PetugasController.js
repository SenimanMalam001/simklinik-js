const models = require('../models');
const Op = require('sequelize').Op

module.exports = {
  all: (req,res) => {
    models.Petugas.all().then(petugas => {
      res.status(200).json({
        message: 'Success Read Petugas',
        data: petugas
      })
    }).catch((err) => {
      res.status(500).json({
        message: 'Something Went Wrong'
      })
    })

  },
  find: (req,res) => {
    const { id } = req.params
    models.Petugas.findOne({
      where: {
        id: id
      }
    }).then(petugas => {
      res.status(200).json({
        message: 'Success Read Petugas',
        data: petugas
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
    models.Petugas.count().then(count => {
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
      return models.Petugas.all({
        include: [
          {
            model: models.User,
            where: {
              name: {
                [Op.like]: `%${q}%`
              }
            }
          }
        ],
        limit,
        offset
      })
    }).then(data => {
      const { pages } = pagination
      let petugas = []
      data.forEach(data => {
        petugas.push({
          id: data.id,
          user: data.User.name,
        })
      })
      res.status(200).json({
        message: 'Success Read Petugas',
        data: {
          data: petugas,
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
    const { user,  } = req.body
    models.Petugas.create({
      user,
    }).then((petugas) => {
      res.status(201).json({
        message: 'Success Create Petugas',
        data: petugas
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
    const { user } = req.body
    models.Petugas.findOne({
      where: { id: id}
    }).then((petugas) => {
      if (petugas) {
        petugas.update({
          user,
        }).then((updatedRuangan) => {
          res.status(200).json({
            message: 'Success Update Petugas',
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
    models.Petugas.findOne({
      where: {
        id: id
      }
    }).then((petugas) => {
      petugas.destroy().then(() => {
        res.status(200).json({
          message: 'Success Delete Petugas',
          data: petugas
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
