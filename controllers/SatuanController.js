const models = require('../models');

module.exports = {
  index: (req,res) => {
    models.Satuan.all().then(satuan => {
      res.status(200).json({
        message: 'Success Read Satuan',
        data: satuan
      })
    }).catch((err) => {
      res.status(500).json({
        message: 'Something Went Wrong'
      })
    })

  },
  create: (req, res) => {
    const { name } = req.body
    const display_name = name.toLowerCase().replace(' ','_')
    models.Satuan.create({
      name,
      display_name
    }).then((satuan) => {
      res.status(201).json({
        message: 'Success Create Satuan',
        data: satuan
      })
    }).catch((err) => {
      res.status(500).json({
        message: 'Something Went Wrong',
      })
    })
  },
  update: (req, res) => {
    const { id } = req.params
    const { name } = req.body
    const display_name = name.toLowerCase().replace(' ','_')
    models.Satuan.findOne({
      where: { id: id}
    }).then((satuan) => {
      if (satuan) {
        satuan.update({
          name,
          display_name
        }).then((updatedKategoriTransaksi) => {
          res.status(200).json({
            message: 'Success Update Satuan',
            data: updatedKategoriTransaksi
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
    models.Satuan.findOne({
      where: {
        id: id
      }
    }).then((satuan) => {
      satuan.destroy().then(() => {
        res.status(200).json({
          message: 'Success Delete Satuan',
          data: satuan
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
