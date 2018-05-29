const models = require('../models');
const Op = require('sequelize').Op

module.exports = {
  find: (req,res) => {
    const { id } = req.params
    const { user } = req
    models.Penjualan.findOne({
      where: {
        id: id
      },
      include: [
        {
          model: models.PetugasPenjualan
        }
      ]
    }).then(penjualan => {
      models.TbsPenjualan.destroy({
        where: {
          user: user.id
        }
      }).then(data => {
        return models.DetailPenjualan.all({
          where: {
            no_trans: penjualan.no_trans
          }
        })
      }).then(detailPenjualan => {
        const tbsPenjualan = []
        detailPenjualan.forEach((detail) => {
          const { produk, harga_jual, jumlah,subtotal,diskon, total_akhir} = detail
          tbsPenjualan.push({
            user: user.id ,
            produk,
            harga_jual,
            jumlah,
            subtotal,
            diskon,
            total_akhir
          })
        })
        return models.TbsPenjualan.bulkCreate( tbsPenjualan)
      }).then(tbsPenjualan => {
        res.status(200).json({
          message: 'Success Read Penjualan',
          data: penjualan
        })
      }).catch(err => {
        console.log(err);
        res.status(500).json({
          message: 'Something Went Wrong'
        })
      })
    }).catch((err) => {
      console.log(err);
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
    models.Penjualan.count({
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
      return models.Penjualan.all({
        where: {
          no_trans: { [Op.like]: `%${q}%`}
        },
        limit,
        offset,
        include: [
          {
            model: models.Penjamin,
          }
        ]
      })
    }).then(data => {
      const { pages } = pagination
      let penjualan = []
      data.forEach(data => {
        penjualan.push({
          id: data.id,
          no_trans: data.no_trans,
          penjamin: data.Penjamin.nama,
          total_akhir: data.total_akhir,
        })
      })
      res.status(200).json({
        message: 'Success Read Penjualan',
        data: {
          data: penjualan,
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
    const {
      penjamin,
      status_jual,
      subtotal,
      diskon,
      total_akhir,
      jumlah_bayar,
      jumlah_kredit,
      cara_bayar,
      no_reg,
      petugas
    } = req.body
    const { user } = req
    models.sequelize.transaction().then(t => {
      return models.Penjualan.create({
        no_reg,
        penjamin,
        status_jual,
        subtotal,
        diskon,
        total_akhir,
        jumlah_bayar,
        cara_bayar,
        jumlah_kredit,
        userCreated: user.id,
        userEdited: user.id
      }, { transaction: t, petugas: petugas }).then((result) => {
          res.status(201).json({
            message: 'Success Create Penjualan',
            data: result
          })
      }).catch((err) => {
        console.log(err);
        res.status(500).json({
          message: 'Something Went Wrong',
        })
        return t.rollback()
      })
    })
  },
  update: (req, res) => {
    const { id } = req.params
    const { ...input } = req.body
    const { petugas } = req.body
      models.Penjualan.findOne({
        where: { id: id}
      }).then((penjualan) => {
        if (penjualan) {
          models.sequelize.transaction(t => {
          penjualan.update({...input, userEdited: req.user.id},{ petugas}).then((updatedPenjualan) => {
              res.status(200).json({
                data: updatedPenjualan
              })
          }).catch((err) => {
            console.log(err);
            res.status(500).json({
              message: 'Something Went Wrong',
            })
          })
          })
        } else {
          res.status(404).json({
            message: 'Data Not Found',
          })
        }
      }).catch((err) => {
        console.log(err);
        res.status(500).json({
          message: 'Something Went Wrong',
        })
      })
  },
  destroy: (req, res) => {
    const { id } = req.params
    models.sequelize.transaction().then(t => {
      models.Penjualan.findOne({
        where: {
          id: id
        }
      }).then((penjualan) => {
        penjualan.destroy({ transaction: t}).then(() => {
          res.status(200).json({
            message: 'Success Delete Penjualan',
            data: penjualan
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
    })
  },
};
