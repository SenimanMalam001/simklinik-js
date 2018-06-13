const models = require('../models');
const Op = require('sequelize').Op
const { caching } = require('../middlewares/redis')

module.exports = {
  all: (req,res) => {
    models.Pasien.all().then(user => {
      caching('Pasien',user)
      res.status(200).json({
        message: 'Success Read Pasien',
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
    models.Pasien.findOne({
      where: {
        id: id
      }
    }).then(user => {
      res.status(200).json({
        message: 'Success Read Pasien',
        data: user
      })
    }).catch((err) => {
      res.status(500).json({
        message: 'Something Went Wrong'
      })
    })

  },
  search: (req,res) => {
    const { no_rm, nama, tanggal_lahir, no_telp } = req.body
    models.Pasien.findAll({
      where: {
        [Op.or]: [
          { no_rm: {
            [Op.eq]: no_rm
          }},
          { nama: {
            [Op.like]: `${nama}%`
          }},
          { tanggal_lahir: {
            [Op.eq]: tanggal_lahir
          }},
          { no_telp: {
            [Op.eq]: no_telp
          }},
        ]
      }
    }).then(pasien => {
      res.status(200).json({
        message: 'Success Search Pasien',
        data: pasien
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
    models.Pasien.count({
      where: {
        [Op.or]: [
          { no_rm: {
            [Op.like]: `%${q}%`
          }},
          { nama: {
            [Op.like]: `%${q}%`
          }},
          { tanggal_lahir: {
            [Op.like]: `%${q}%`
          }},
        ]
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
      return models.Pasien.all({
      where: {
        [Op.or]: [
          { no_rm: {
            [Op.like]: `%${q}%`
          }},
          { nama: {
            [Op.like]: `%${q}%`
          }},
          { tanggal_lahir: {
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
        message: 'Success Read Pasien',
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
    const { nama, alamat, gender, no_telp, tanggal_lahir, penjamin } = req.body

    models.Profil.findOne({
      where: { id: 1}
    }).then((profil) => {
      models.Pasien.findAll({
        limit: 1,
        where: {
          no_rm: {
            [Op.like]: `${profil.kode}%`
          }
        },
        order: [['createdAt', 'DESC']]
      }).then((pasien) => {
        let { no_rm } = pasien[0]
        no_rm = no_rm.split('-')
        no_rm = Number(no_rm[1]) + 1
        no_rm = `${profil.kode}-${no_rm}`
        models.Pasien.create({
          no_rm,
          nama,
          alamat,
          gender,
          no_telp,
          tanggal_lahir,
          penjamin
        }).then((pasien) => {
          res.status(201).json({
            message: 'Success Create Pasien',
            data: pasien
          })
        }).catch((err) => {
          console.log(err);
          res.status(500).json({
            message: 'Something Went Wrong',
          })
        })
      })
    }).catch((err) => {
      console.log(err);
    });
  },
  update: (req, res) => {
    const { id } = req.params
    const { nama, alamat, gender, no_telp, tanggal_lahir, penjamin } = req.body
    models.Pasien.findOne({
      where: { id: id}
    }).then((pasien) => {
      if (pasien) {
        pasien.update({
          nama,
          alamat,
          gender,
          no_telp,
          tanggal_lahir,
          penjamin
        }).then((updatedRuangan) => {
          res.status(200).json({
            message: 'Success Update Pasien',
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
    models.Pasien.findOne({
      where: {
        id: id
      }
    }).then((pasien) => {
      pasien.destroy().then(() => {
        res.status(200).json({
          message: 'Success Delete Pasien',
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
