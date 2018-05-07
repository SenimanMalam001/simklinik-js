const models = require('../models');
const Op = require('sequelize').Op

module.exports = {
  search: (req,res) => {
    const { no_rm, nama, tanggal_lahir } = req.body
    models.Pasien.find({
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
    models.Pasien.all().then(pasien => {
      res.status(200).json({
        message: 'Success Read Pasien',
        data: pasien
      })
    }).catch((err) => {
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
