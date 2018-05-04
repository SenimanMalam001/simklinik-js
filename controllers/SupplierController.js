const models = require('../models');

module.exports = {
  index: (req,res) => {
    models.Supplier.all().then(supplier => {
      res.status(200).json({
        message: 'Success Read Supplier',
        data: supplier
      })
    }).catch((err) => {
      res.status(500).json({
        message: 'Something Went Wrong'
      })
    })

  },
  create: (req, res) => {
    const { nama, alamat, no_telp } = req.body
    models.Supplier.create({
      nama,
      alamat,
      no_telp
    }).then((supplier) => {
      res.status(201).json({
        message: 'Success Create Supplier',
        data: supplier
      })
    }).catch((err) => {
      res.status(500).json({
        message: 'Something Went Wrong',
      })
    })
  },
  update: (req, res) => {
    const { id } = req.params
    const { nama, alamat, no_telp } = req.body
    models.Supplier.findOne({
      where: { id: id}
    }).then((supplier) => {
      if (supplier) {
        supplier.update({
          nama,
          alamat,
          no_telp
        }).then((updatedRuangan) => {
          res.status(200).json({
            message: 'Success Update Supplier',
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
    models.Supplier.findOne({
      where: {
        id: id
      }
    }).then((supplier) => {
      supplier.destroy().then(() => {
        res.status(200).json({
          message: 'Success Delete Supplier',
          data: supplier
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
