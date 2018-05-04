const models = require('../models');

module.exports = {
  index: (req,res) => {
    models.Kas.all().then(kas => {
      res.status(200).json({
        message: 'Success Read Kas',
        data: kas
      })
    }).catch((err) => {
      res.status(500).json({
        message: 'Something Went Wrong'
      })
    })

  },
  create: (req, res) => {
    const { nama, kode,  } = req.body
    models.Kas.create({
      nama,
      kode,
    }).then((kas) => {
      res.status(201).json({
        message: 'Success Create Kas',
        data: kas
      })
    }).catch((err) => {
      res.status(500).json({
        message: 'Something Went Wrong',
      })
    })
  },
  update: (req, res) => {
    const { id } = req.params
    const { nama, kode } = req.body
    models.Kas.findOne({
      where: { id: id}
    }).then((kas) => {
      if (kas) {
        kas.update({
          nama,
          kode,
        }).then((updatedRuangan) => {
          res.status(200).json({
            message: 'Success Update Kas',
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
    models.Kas.findOne({
      where: {
        id: id
      }
    }).then((kas) => {
      kas.destroy().then(() => {
        res.status(200).json({
          message: 'Success Delete Kas',
          data: kas
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
