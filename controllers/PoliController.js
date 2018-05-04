const models = require('../models');

module.exports = {
  index: (req,res) => {
    models.Poli.all().then(poli => {
      res.status(200).json({
        message: 'Success Read Poli',
        data: poli
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
    models.Poli.create({
      name,
      display_name
    }).then((poli) => {
      res.status(201).json({
        message: 'Success Create Poli',
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
    const { name } = req.body
    const display_name = name.toLowerCase().replace(' ','_')
    models.Poli.findOne({
      where: { id: id}
    }).then((poli) => {
      if (poli) {
        poli.update({
          name,
          display_name
        }).then((updatedKategoriTransaksi) => {
          res.status(200).json({
            message: 'Success Update Poli',
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
    models.Poli.findOne({
      where: {
        id: id
      }
    }).then((poli) => {
      poli.destroy().then(() => {
        res.status(200).json({
          message: 'Success Delete Poli',
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
