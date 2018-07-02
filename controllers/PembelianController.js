const models = require('../models');
const Op = require('sequelize').Op
const transaction = require('sequelize').transaction
const sequelize = require('sequelize')
const moment = require('moment')

module.exports = {
  find: (req,res) => {
    const { id } = req.params
    const { user } = req
    models.Pembelian.findOne({
      where: {
        id: id
      },
      include: [
        {
          model: models.DetailPembelian,
          include: [ { model: models.Produk}]
        }
      ]
    }).then(pembelian => {
      models.TbsPembelian.destroy({
        where: {
          user: user.id
        }
      }).then(data => {
        return models.DetailPembelian.all({
          where: {
            no_trans: pembelian.no_trans
          }
        })
      }).then(detailPembelian => {
        const tbsPembelian = []
        detailPembelian.forEach((detail) => {
          const { produk, harga_beli, jumlah,subtotal,diskon, total_akhir} = detail
          tbsPembelian.push({
            user: user.id ,
            produk,
            harga_beli,
            jumlah,
            subtotal,
            diskon,
            total_akhir
          })
        })
        return models.TbsPembelian.bulkCreate( tbsPembelian)
      }).then(tbsPembelian => {
        res.status(200).json({
          message: 'Success Read Pembelian',
          data: pembelian
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
    models.Pembelian.count({
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
      return models.Pembelian.all({
        where: {
          no_trans: { [Op.like]: `%${q}%`}
        },
        limit,
        offset,
        include: [
          {
            model: models.Supplier,
          }
        ]
      })
    }).then(data => {
      const { pages } = pagination
      let pembelian = []
      data.forEach(data => {
        pembelian.push({
          id: data.id,
          no_trans: data.no_trans,
          supplier: data.Supplier.nama,
          total_akhir: data.total_akhir,
          waktu: moment(data.createdAt).format('DD-MM-YYYY, h:mm:ss')
        })
      })
      res.status(200).json({
        message: 'Success Read Pembelian',
        data: {
          data: pembelian,
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
      supplier,
      no_faktur_supplier,
      status_beli,
      subtotal,
      diskon,
      total_akhir,
      jumlah_bayar,
      jumlah_kredit,
      cara_bayar
    } = req.body
    const { user } = req
    models.sequelize.transaction().then(t => {
      return models.Pembelian.create({
        supplier,
        no_faktur_supplier,
        status_beli,
        subtotal,
        diskon,
        total_akhir,
        jumlah_bayar,
        cara_bayar,
        jumlah_kredit,
        userCreated: user.id,
        userEdited: user.id
      }, { transaction: t}).then((result) => {
        res.status(201).json({
          message: 'Success Create Pembelian',
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
      models.Pembelian.findOne({
        where: { id: id}
      }).then((pembelian) => {
        if (pembelian) {
          models.sequelize.transaction(t => {
          pembelian.update({...input, userEdited: req.user.id}).then((updatedPembelian) => {
            res.status(200).json({
              data: updatedPembelian
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
      models.Pembelian.findOne({
        where: {
          id: id
        }
      }).then((pembelian) => {
        pembelian.destroy({ transaction: t}).then(() => {
          res.status(200).json({
            message: 'Success Delete Pembelian',
            data: pembelian
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
