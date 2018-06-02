const models = require('../models');

module.exports = {
  index: (req,res) => {
    models.Profil.all().then(profil => {
      res.status(200).json({
        message: 'Success Read Profil',
        data: profil
      })
    }).catch((err) => {
      res.status(500).json({
        message: 'Something Went Wrong'
      })
    })

  },
  update: (req, res) => {
    const { nama, kode, alamat, logo, no_telp,  } = req.body
    models.Profil.findOne({
      where: { id: 1}
    }).then((profil) => {
      if (profil) {
        profil.update({
          nama,
          kode,
          alamat,
          logo,
          no_telp,
        }).then((updatedProfil) => {
          res.status(200).json({
            message: 'Success Update Profil',
            data: updatedProfil
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
};
