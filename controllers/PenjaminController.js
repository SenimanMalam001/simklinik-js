const models = require('../models');

module.exports = {
  index: (req,res) => {
    models.Penjamin.all().then(penjamin => {
      res.status(200).json({
        message: 'Success Read Penjamin',
        data: penjamin
      })
    }).catch((err) => {
      res.status(500).json({
        message: 'Something Went Wrong'
      })
    })

  },
  create: (req, res) => {
    const { nama, alamat, level, no_telp } = req.body
    models.Penjamin.create({
      nama,
      alamat,
      level,
      no_telp
    }).then((penjamin) => {
      res.status(201).json({
        message: 'Success Create Penjamin',
        data: penjamin
      })
    }).catch((err) => {
      res.status(500).json({
        message: 'Something Went Wrong',
      })
    })
  },
  update: (req, res) => {
    const { id } = req.params
    const { nama, alamat, level, no_telp } = req.body
    models.Penjamin.findOne({
      where: { id: id}
    }).then((penjamin) => {
      if (penjamin) {
        penjamin.update({
          nama,
          alamat,
          level,
          no_telp
        }).then((updatedRuangan) => {
          res.status(200).json({
            message: 'Success Update Penjamin',
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
    models.Penjamin.findOne({
      where: {
        id: id
      }
    }).then((penjamin) => {
      penjamin.destroy().then(() => {
        res.status(200).json({
          message: 'Success Delete Penjamin',
          data: penjamin
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
