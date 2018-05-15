const models = require('../models');
const Op = require('sequelize').Op

module.exports = {
  find: (req,res) => {
    const { id } = req.params
    models.StokAwal.findOne({
      where: {
        id: id
      }
    }).then(user => {
      res.status(200).json({
        message: 'Success Read StokAwal',
        data: user
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
    models.StokAwal.count({
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
      return models.StokAwal.all({
        where: {
          no_trans: { [Op.like]: `%${q}%`}
        },
        limit,
        offset,
        include: [
          {
            model: models.Produk,
          }
        ]
      })
    }).then(data => {
      const { pages } = pagination
      let stokAwal = []
      data.forEach(data => {
        stokAwal.push({
          id: data.id,
          no_trans: data.no_trans,
          produk: data.Produk.nama,
          jumlah: data.jumlah,
        })
      })
      res.status(200).json({
        message: 'Success Read StokAwal',
        data: {
          data: stokAwal,
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
    const { produk,  jumlah } = req.body
    models.StokAwal.findOne({
        order: [['createdAt', 'DESC']]
    }).then(stokAwal => {
      if (stokAwal) {
        let { no_trans } = stokAwal
        no_trans = no_trans.split('-')
        no_trans = Number(no_trans[1]) + 1
        no_trans = `SA-${no_trans}`
        return no_trans
      } else {
        return 'SA-1'
      }
    }).then(no_trans => {
      return models.StokAwal.create({
        no_trans,
        produk,
        jumlah,
      })
    }).then((stokAwal) => {
      res.status(201).json({
        message: 'Success Create StokAwal',
        data: stokAwal
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
    const { produk,  jumlah } = req.body
    models.StokAwal.findOne({
      where: { id: id}
    }).then((stokAwal) => {
      if (stokAwal) {
        stokAwal.update({
          produk,
          jumlah
        }).then((updatedRuangan) => {
          res.status(200).json({
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
    models.StokAwal.findOne({
      where: {
        id: id
      }
    }).then((stokAwal) => {
      stokAwal.destroy().then(() => {
        res.status(200).json({
          message: 'Success Delete StokAwal',
          data: stokAwal
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
