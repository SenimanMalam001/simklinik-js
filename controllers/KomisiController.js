const models = require('../models');
const Op = require('sequelize').Op

module.exports = {
  find: (req,res) => {
    const { id } = req.params
    models.Komisi.findOne({
      where: {
        id: id
      }
    }).then(user => {
      res.status(200).json({
        message: 'Success Read Komisi',
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
    models.Komisi.count({
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
      const queryPencarian = {
        queryUser: '',
        queryProduk: ''
      }
      if (q) {
        q = q.replace(/ /g, '').split('|')
        queryPencarian.queryUser = q[0]
        if (q[1]) {
          queryPencarian.queryProduk = q[1]
        }
      }
      return models.Komisi.all({
        limit,
        offset,
        include: [
          {
            model: models.User,
            where: { name: { [Op.like]: `%${queryPencarian.queryUser}%`}}
          },
          {
            model: models.Produk,
            where: { nama: { [Op.like]: `%${queryPencarian.queryProduk}%`}}
          }
        ]
      })
    }).then(data => {
      const { pages } = pagination
      let userProduk = []
      data.forEach(data => {
        userProduk.push({
          id: data.id,
          user: data.User.name,
          produk: data.Produk.nama,
          jumlah: data.jumlah
        })
      })
      res.status(200).json({
        message: 'Success Read Komisi',
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
