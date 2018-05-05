const models = require('../models');

module.exports = {
  index: (req,res) => {
    models.Komisi.all().then(penjamin => {
      res.status(200).json({
        message: 'Success Read Komisi',
        data: penjamin
      })
    }).catch((err) => {
      res.status(500).json({
        message: 'Something Went Wrong'
      })
    })

  },
  create: (req, res) => {
    const { produk, user, jumlah } = req.body
    models.Komisi.create({
      produk,
      user,
      jumlah,
      
    }).then((penjamin) => {
      res.status(201).json({
        message: 'Success Create Komisi',
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
    const { produk, user, jumlah } = req.body
    models.Komisi.findOne({
      where: { id: id}
    }).then((penjamin) => {
      if (penjamin) {
        penjamin.update({
          produk,
          user,
          jumlah,
          
        }).then((updatedRuangan) => {
          res.status(200).json({
            message: 'Success Update Komisi',
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
    models.Komisi.findOne({
      where: {
        id: id
      }
    }).then((penjamin) => {
      penjamin.destroy().then(() => {
        res.status(200).json({
          message: 'Success Delete Komisi',
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
