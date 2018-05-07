const models = require('../models');
const Op = require('sequelize').Op

module.exports = {
  index: (req,res) => {
    models.Registrasi.all().then(registrasi => {
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
  create: (req, res) => {
    const { pasien, penjamin, poli, dokter, jenis_registrasi, ruangan } = req.body
    models.Registrasi.findAll({
        limit: 1,
        order: [['createdAt', 'DESC']]
    }).then((registrasi) => {
      if (registrasi.length) {
        const { no_reg } = registrasi[0]
        console.log(no_reg)
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
        res.status(201).json({
          message: 'Success Create Registrasi',
          data: registrasi
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
