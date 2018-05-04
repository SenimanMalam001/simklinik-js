const models = require('../models');

module.exports = {
  index: (req,res) => {
    models.Ruangan.all().then(poli => {
      res.status(200).json({
        message: 'Success Read Ruangan',
        data: poli
      })
    }).catch((err) => {
      res.status(500).json({
        message: 'Something Went Wrong'
      })
    })

  },
  create: (req, res) => {
    const { nama, kode, jumlah } = req.body
    models.Ruangan.create({
      nama,
      kode,
      jumlah
    }).then((poli) => {
      res.status(201).json({
        message: 'Success Create Ruangan',
        data: poli
      })
    }).catch((err) => {
      res.status(500).json({
        message: 'Something Went Wrong',
      })
    })
  },
  update: (req, res) => {
    const { id } = req.params
    const { nama, kode, jumlah } = req.body
    models.Ruangan.findOne({
      where: { id: id}
    }).then((poli) => {
      if (poli) {
        poli.update({
          nama,
          kode,
          jumlah
        }).then((updatedRuangan) => {
          res.status(200).json({
            message: 'Success Update Ruangan',
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
    models.Ruangan.findOne({
      where: {
        id: id
      }
    }).then((poli) => {
      poli.destroy().then(() => {
        res.status(200).json({
          message: 'Success Delete Ruangan',
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
