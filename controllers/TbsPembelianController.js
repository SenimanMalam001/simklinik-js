const models = require('../models');
const Op = require('sequelize').Op

module.exports = {
  find: (req,res) => {
    const { id } = req.params
    models.TbsPembelian.findOne({
      where: {
        id: id
      }
    }).then(user => {
      res.status(200).json({
        message: 'Success Read TbsPembelian',
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
    const { user } = req
    if (!q) {
      q = ''
    }
    if (!page) {
      page = 1
    }
    let pagination
    let limit = 10
    let offset = 0
    models.TbsPembelian.count({
      where: {
        user: user.id
      }
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
      return models.TbsPembelian.all({
        where: {
          user: user.id
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
      let tbsPembelian = []
      data.forEach(data => {
        tbsPembelian.push({
          id: data.id,
          produk: data.Produk.nama,
          harga_beli: data.harga_beli,
          jumlah: data.jumlah,
          subtotal: data.subtotal,
          diskon: data.diskon,
          total_akhir: data.total_akhir,
        })
      })
      res.status(200).json({
        message: 'Success Read TbsPembelian',
        data: {
          data: tbsPembelian,
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
    const { produk, harga_beli, jumlah, subtotal, diskon, total_akhir } = req.body
    const { user } = req
    models.TbsPembelian.create({
        user: user.id,
        produk,
        harga_beli,
        jumlah,
        subtotal,
        diskon,
        total_akhir
    }).then((tbsPembelian) => {
      res.status(201).json({
        message: 'Success Create TbsPembelian',
        data: tbsPembelian
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
    const { produk, keterangan, jumlah } = req.body
    models.TbsPembelian.findOne({
      where: { id: id}
    }).then((tbsPembelian) => {
      if (tbsPembelian) {
        tbsPembelian.update({
          produk,
          keterangan,
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
    models.TbsPembelian.findOne({
      where: {
        id: id
      }
    }).then((tbsPembelian) => {
      tbsPembelian.destroy().then(() => {
        res.status(200).json({
          message: 'Success Delete TbsPembelian',
          data: tbsPembelian
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
  destroyAll: (req, res) => {
    const { id } = req.params
    const { user } = req
    models.TbsPembelian.destroy({
      where: {
        user: user.id
      },
    }).then((tbsPembelian) => {
        res.status(200).json({
          message: 'Success Delete TbsPembelian',
          data: tbsPembelian
        })
    }).catch((err) => {
      res.status(500).json({
        message: 'Something Went Wrong',
        no_trans
      })
    })
  },
};
