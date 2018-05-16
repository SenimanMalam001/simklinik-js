const models = require('../models');
const Op = require('sequelize').Op

module.exports = {
  interval: (req,res) => {
    const { dari_tanggal, sampai_tanggal} = req.query
    models.StokOpname.findAll({
      where: {
        createdAt: {
          [Op.gte]: new Date(dari_tanggal),
          [Op.lte]: new Date(sampai_tanggal)
        },
      }
    }).then(user => {
      res.status(200).json({
        message: 'Success Read Stok Opname',
        data: user
      })
    }).catch((err) => {
      console.log(err);
      res.status(500).json({
        message: 'Something Went Wrong'
      })
    })

  },
  find: (req,res) => {
    const { id } = req.params
    models.StokOpname.findOne({
      where: {
        id: id
      }
    }).then(user => {
      res.status(200).json({
        message: 'Success Read StokOpname',
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
    models.StokOpname.count({
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
      return models.StokOpname.all({
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
      let stokOpname = []
      data.forEach(data => {
        stokOpname.push({
          id: data.id,
          no_trans: data.no_trans,
          produk: data.Produk.nama,
          stok_akhir: data.stok_akhir,
          stok_komputer: data.stok_komputer,
          selisih: data.selisih,
          nilai_selisih: data.nilai_selisih,
        })
      })
      res.status(200).json({
        message: 'Success Read StokOpname',
        data: {
          data: stokOpname,
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
    const { produk,  stok_akhir } = req.body
    models.StokOpname.create({
        produk,
        stok_akhir,
    }).then((stokOpname) => {
      res.status(201).json({
        message: 'Success Create StokOpname',
        data: stokOpname
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
    const { produk,  stok_akhir } = req.body
    models.StokOpname.findOne({
      where: { id: id}
    }).then((stokOpname) => {
      if (stokOpname) {
        stokOpname.update({
          produk,
          stok_akhir
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
    models.StokOpname.findOne({
      where: {
        id: id
      }
    }).then((stokOpname) => {
      stokOpname.destroy().then(() => {
        res.status(200).json({
          message: 'Success Delete StokOpname',
          data: stokOpname
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
