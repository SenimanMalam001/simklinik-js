const models = require('../models');
const Op = require('sequelize').Op

module.exports = {
  interval: (req,res) => {
    const { dari_tanggal, sampai_tanggal, jenis, user} = req.query
    models.KomisiPenjualan.findAll({
      where: {
        createdAt: {
          [Op.gte]: new Date(Number(dari_tanggal)),
          [Op.lte]: new Date(Number(sampai_tanggal))
        },
        user: user
      },
      include: [
        {
          model: models.User,
        },
        {
          model: models.Produk,
        }
      ]
    }).then( async (data) => {
      let userProduk = []
      data.forEach(data => {
        userProduk.push({
          id: data.id,
          no_trans: data.no_trans,
          user: data.User.name,
          produk: data.Produk.nama,
          jumlah: data.jumlah,
          nilai_komisi: data.nilai_komisi,
          total_komisi: data.total_komisi,
        })
      })
      res.status(200).json({
        message: 'Success Read Komisi Penjualan',
        data: userProduk
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
    models.KomisiPenjualan.findOne({
      where: {
        id: id
      }
    }).then(user => {
      res.status(200).json({
        message: 'Success Read KomisiPenjualan',
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
    models.KomisiPenjualan.count({
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
      return models.KomisiPenjualan.all({
        limit,
        offset,
        include: [
          {
            model: models.User,
          },
          {
            model: models.Produk,
            where: { nama: { [Op.like]: `%${q}%`}}
          }
        ]
      })
    }).then(data => {
      const { pages } = pagination
      let userProduk = []
      data.forEach(data => {
        userProduk.push({
          id: data.id,
          no_trans: data.no_trans,
          user: data.User.name,
          produk: data.Produk.nama,
          jumlah: data.jumlah,
          nilai_komisi: data.nilai_komisi,
          total_komisi: data.total_komisi,
        })
      })
      res.status(200).json({
        message: 'Success Read KomisiPenjualan',
        data: {
          data: userProduk,
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
    const { produk, user, jumlah, no_trans } = req.body
    models.KomisiPenjualan.create({
      produk,
      user,
      jumlah,
      no_trans,
    }).then((penjamin) => {
      res.status(201).json({
        message: 'Success Create KomisiPenjualan',
        data: penjamin
      })
    }).catch((err) => {
      console.log(err);
      res.status(500).json({
        message: 'Something Went Wrong',err: err
      })
    })
  },
  update: (req, res) => {
    const { id } = req.params
    const { produk, user, jumlah, no_trans, nilai_komisi, total_komisi } = req.body
    models.KomisiPenjualan.findOne({
      where: { id: id}
    }).then((penjamin) => {
      if (penjamin) {
        penjamin.update({
          produk,
          user,
          jumlah,
          no_trans,
          nilai_komisi,
          total_komisi
        }).then((updatedRuangan) => {
          res.status(200).json({
            message: 'Success Update KomisiPenjualan',
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
    models.KomisiPenjualan.findOne({
      where: {
        id: id
      }
    }).then((penjamin) => {
      penjamin.destroy().then(() => {
        res.status(200).json({
          message: 'Success Delete KomisiPenjualan',
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
