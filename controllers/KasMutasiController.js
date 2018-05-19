const models = require('../models');
const Op = require('sequelize').Op

module.exports = {
  find: (req,res) => {
    const { id } = req.params
    models.KasMutasi.findOne({
      where: {
        id: id
      }
    }).then(kasMutasi => {
      res.status(200).json({
        message: 'Success Read Kas Mutasi',
        data: kasMutasi
      })
    }).catch((err) => {
      res.status(500).json({
        message: 'Something Went Wrong'
      })
    })

  },
  index: (req,res) => {
    let { q, page } = req.query
    if (!q) {
      q = ''
    }
    if (!page) {
      page = 1
    }
    let pagination
    let limit = 10
    let offset = 0
    models.KasMutasi.count({
    }).then(count => {
      let pages = Math.ceil(count / limit)
      offset = limit * (page - 1)
      pagination = {
        limit,
        offset,
        pages,
        page
      }
      return pagination
    }).then(pagination => {
      const { limit, offset} = pagination
      return models.KasMutasi.all({
        where: {
          no_trans: { [Op.like]: `%${q}%`}
        },
        limit,
        offset,
        include: [
          {
            model: models.Kas,
            as: 'DariKas'
          },
          {
            model: models.Kas,
            as: 'KeKas'
          },
        ]
      })
    }).then(data => {
      const { pages } = pagination
      let kasMutasi = []
      data.forEach(data => {
        kasMutasi.push({
          id: data.id,
          no_trans: data.no_trans,
          dari_kas: data.DariKas.nama,
          ke_kas: data.KeKas.nama,
          jumlah: data.jumlah,
          keterangan: data.keterangan,
        })
      })
      res.status(200).json({
        message: 'Success Read KasMutasi',
        data: {
          data: kasMutasi,
          pages
        }
      })
    }).catch((err) => {
      console.log(err);
      res.status(500).json({
        message: 'Something Went Wrong'
      })
    })

  },
  create: (req, res) => {
    const { dari_kas, ke_kas, keterangan, jumlah } = req.body
    models.KasMutasi.create({
        dari_kas, ke_kas,
        keterangan,
        jumlah,
    }).then((kasMutasi) => {
      res.status(201).json({
        message: 'Success Create Kas Mutasi',
        data: kasMutasi
      })
    }).catch((err) => {
      console.log(err);
      res.status(500).json({
        message: 'Something Went Wrong',
      })
    })
  },
  update: (req, res) => {
    const { id } = req.params
    const { dari_kas, ke_kas, keterangan, jumlah,  } = req.body
    models.KasMutasi.findOne({
      where: { id: id}
    }).then((kasMutasi) => {
      if (kasMutasi) {
        kasMutasi.update({
          dari_kas, ke_kas,
          keterangan,
          jumlah,
        }).then((updatedRuangan) => {
          res.status(200).json({
            message: "Success Update Kas Mutasi",
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
    models.KasMutasi.findOne({
      where: {
        id: id
      }
    }).then((kasMutasi) => {
      kasMutasi.destroy().then(() => {
        res.status(200).json({
          message: 'Success Delete Kas Mutasi',
          data: kasMutasi
        })
      }).catch((err) => {
        res.status(500).json({
          message: 'Something Went Wrong',
          no_trans
        })
      })
    }).catch((err) => {
      res.status(500).json({
        message: 'Something Went Wrong',
      })
    })
  },
};
