const models = require('../models');
const Op = require('sequelize').Op

module.exports = {
  find: (req,res) => {
    const { id } = req.params
    models.ItemKeluar.findOne({
      where: {
        id: id
      }
    }).then(user => {
      res.status(200).json({
        message: 'Success Read Item Keluar',
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
    models.ItemKeluar.count({
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
      return models.ItemKeluar.all({
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
      let itemKeluar = []
      data.forEach(data => {
        itemKeluar.push({
          id: data.id,
          no_trans: data.no_trans,
          produk: data.Produk.nama,
          jumlah: data.jumlah,
          keterangan: data.keterangan,
        })
      })
      res.status(200).json({
        message: 'Success Read Item Keluar',
        data: {
          data: itemKeluar,
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
    const { produk, keterangan, jumlah } = req.body
    models.ItemKeluar.findOne({
        order: [['createdAt', 'DESC']]
    }).then(itemKeluar => {
      if (itemKeluar) {
        let { no_trans } = itemKeluar
        no_trans = no_trans.split('-')
        no_trans = Number(no_trans[1]) + 1
        no_trans = `IK-${no_trans}`
        return no_trans
      } else {
        return 'IK-1'
      }
    }).then(no_trans => {
      return models.ItemKeluar.create({
        no_trans,
        produk,
        keterangan,
        jumlah,
      })
    }).then((itemKeluar) => {
      res.status(201).json({
        message: 'Success Create Item Keluar',
        data: itemKeluar
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
    models.ItemKeluar.findOne({
      where: { id: id}
    }).then((penjamin) => {
      if (penjamin) {
        penjamin.update({
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
    models.ItemKeluar.findOne({
      where: {
        id: id
      }
    }).then((penjamin) => {
      penjamin.destroy().then(() => {
        res.status(200).json({
          message: 'Success Delete Item Keluar',
          data: penjamin
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
