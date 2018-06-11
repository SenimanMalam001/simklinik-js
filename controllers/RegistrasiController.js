const models = require('../models');
const Op = require('sequelize').Op

module.exports = {
  all: (req,res) => {
    models.Registrasi.all({
      where: {
        status_registrasi: 0
      },
      include: [
        {model: models.Pasien}
      ]
    }).then(data => {
      let registrasi = []
      registrasi = data.map(data => {
        return {
          id: data.id,
          no_reg: data.no_reg,
          no_rm: data.Pasien.no_rm,
          nama: data.Pasien.nama,
          penjamin: data.penjamin,
        }
      })
      res.status(200).json({
        message: 'Success Read Registrasi',
        data: registrasi
      })
    }).catch((err) => {
      res.status(500).json({
        message: 'Something Went Wrong'
      })
    })
  },
  find: (req,res) => {
    const { id } = req.params
    models.Registrasi.findOne({
      where: {
        id: id
      }
    }).then(user => {
      res.status(200).json({
        message: 'Success Read Registrasi',
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
    models.Registrasi.count({
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
      const { limit, offset} = pagination
      return models.Registrasi.all({
        include: [
          {
            model: models.Pasien
          },
          {
            model: models.User
          },
          {
            model: models.Poli
          }
        ],
        limit,
        offset,
        order: [['createdAt','DESC']]
      })
    }).then(data => {
      const { pages } = pagination
      let registrasi = []
      registrasi = data.map(data => {
        return {
          id: data.id,
          no_rm: data.Pasien.no_rm,
          nama: data.Pasien.nama,
          dokter: data.User.name,
          poli: data.Poli.display_name,
          no_antrian: data.no_antrian
        }
      })
      res.status(200).json({
        message: 'Success Read Registrasi',
        data: {
          data: registrasi,
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
    const {
      pasien,
      penjamin,
      poli,
      dokter,
      jenis_registrasi,
      ruangan,
      suhu,
      sistole_diastole,
      tinggi_badan,
      berat_badan,
     } = req.body
    models.Registrasi.findAll({
        limit: 1,
        order: [['createdAt', 'DESC']]
    }).then((registrasi) => {
      if (registrasi.length) {
        const { no_reg } = registrasi[0]
        let new_no_reg = no_reg.split('-')
        new_no_reg = Number(new_no_reg[1]) + 1
        new_no_reg = `REG-${new_no_reg}`
        return new_no_reg
      } else {
        return "REG-1"
      }
    }).then((no_reg) => {
      return models.Registrasi.create({
        no_reg,
        pasien,
        penjamin,
        poli,
        dokter,
        jenis_registrasi,
        ruangan
      })
    }).then((registrasi) => {
        models.RekamMedik.create({
          no_reg: registrasi.no_reg,
          suhu,
          sistole_diastole,
          tinggi_badan,
          berat_badan
        }).then(rekamMedik => {
          res.status(201).json({
            message: 'Success Create Registrasi',
            data: registrasi
          })
        }).catch(err => {
          console.log(err);
          res.status(500).json({
            message: 'Something Went Wrong',
          })
        })
    }).catch((err) => {
      console.log(err)
      res.status(500).json({
        message: 'Something Went Wrong',
      })
    })
  },
  update: (req, res) => {
    const { id } = req.params
    const { pasien, penjamin, poli, dokter, ruangan, jenis_registrasi  } = req.body
    let { status_registrasi } = req.body
    if (status_registrasi != 1) {
      status_registrasi = 0
    }
    models.Registrasi.findOne({
      where: { id: id}
    }).then((registrasi) => {
      if (registrasi) {
        registrasi.update({
          pasien,
          penjamin,
          poli,
          dokter,
          status_registrasi,
          ruangan,
          jenis_registrasi
        }).then((updatedRuangan) => {
          res.status(200).json({
            message: 'Success Update Registrasi',
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
    models.Registrasi.findOne({
      where: {
        id: id
      }
    }).then((registrasi) => {
      registrasi.destroy().then(() => {
        res.status(200).json({
          message: 'Success Delete Registrasi',
          data: registrasi
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
