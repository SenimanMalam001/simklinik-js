const models = require('../models');
const Op = require('sequelize').Op
const { caching } = require('../middlewares/redis')

module.exports = {
  all: (req,res) => {
    models.RekamMedik.all().then(user => {
      caching('RekamMedik',user)
      res.status(200).json({
        message: 'Success Read RekamMedik',
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
    models.RekamMedik.findOne({
      where: {
        id: id
      }
    }).then(user => {
      res.status(200).json({
        message: 'Success Read RekamMedik',
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
    models.RekamMedik.count({
      where: {
         no_reg: {
          [Op.like]: `%${q}%`
        },
      }
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
      return models.RekamMedik.all({
        where: {
           no_reg: {
            [Op.like]: `%${q}%`
          },
        },
        limit,
        offset,
        include: [
          {
            model: models.Registrasi,
            include: [{ model: models.Pasien}]
          }
        ]
    })
    }).then(data => {
      const { pages } = pagination
      const rekamMedik = []
      data.map(data => {
        rekamMedik.push({
          id: data.id,
          no_reg: data.no_reg,
          no_rm: data.Registrasi.pasien,
          nama: data.Registrasi.Pasien.nama,
          jenis: data.Registrasi.jenis_registrasi
        })
      })
      res.status(200).json({
        message: 'Success Read RekamMedik',
        data: {
          data: rekamMedik,
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
    const { ...input } = req.body
    models.RekamMedik.create(input).then((pasien) => {
      res.status(201).json({
        message: 'Success Create RekamMedik',
        data: pasien
      })
    }).catch((err) => {
      console.log(err);
      res.status(500).json({
        message: 'Something Went Wrong',
      })
    })
  },
  update: (req, res) => {
    const { id } = req.params
    const { ...input } = req.body
    models.RekamMedik.findOne({
      where: { id: id}
    }).then((pasien) => {
      if (pasien) {
        pasien.update(input).then((updatedRuangan) => {
          res.status(200).json({
            message: 'Success Update RekamMedik',
            data: updatedRuangan
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
    models.RekamMedik.findOne({
      where: {
        id: id
      }
    }).then((pasien) => {
      pasien.destroy().then(() => {
        res.status(200).json({
          message: 'Success Delete RekamMedik',
          data: pasien
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
