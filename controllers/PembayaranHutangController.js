const models = require('../models');
const Op = require('sequelize').Op
const transaction = require('sequelize').transaction
const sequelize = require('sequelize')
const moment = require('moment')

module.exports = {

  find: (req,res) => {
    const { id } = req.params
    models.PembayaranHutang.findOne({
      where: {
        id: id
      }
    }).then(pembayaranHutang => {
      res.status(200).json({
        message: 'Success Read PembayaranHutang',
        data: pembayaranHutang
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
    models.PembayaranHutang.count({
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
      return models.PembayaranHutang.all({
        where: {
          no_trans: { [Op.like]: `%${q}%`}
        },
        limit,
        offset,
        include: [
          {
            model: models.Supplier
          },
        ]
      })
    }).then(data => {
      const { pages } = pagination
      let pembayaranHutang = []
      data.forEach(data => {
        pembayaranHutang.push({
          id: data.id,
          no_trans: data.no_trans,
          jumlah_bayar: data.jumlah_bayar,
          supplier: data.Supplier.nama,
          interval: `${moment(data.dari_tanggal).format('YYYY-MM-DD')} / ${moment(data.sampai_tanggal).format('YYYY-MM-DD')}`,
        })
      })
      res.status(200).json({
        message: 'Success Read PembayaranHutang',
        data: {
          data: pembayaranHutang,
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
      cara_bayar,
      supplier,
      dari_tanggal,
      sampai_tanggal
    } = req.body
    const { user } = req
    models.sequelize.transaction().then(t => {
      return models.PembayaranHutang.create({
        cara_bayar,
        supplier,
        dari_tanggal,
        sampai_tanggal,
        userCreated: user.id,
        userEdited: user.id
      }, { transaction: t}).then((result) => {
        res.status(201).json({
          message: 'Success Create PembayaranHutang',
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
      models.PembayaranHutang.findOne({
        where: { id: id}
      }).then((pembayaranHutang) => {
        if (pembayaranHutang) {
          models.sequelize.transaction(t => {
          pembayaranHutang.update({...input, userEdited: req.user.id}).then((updatedPembayaranHutang) => {
            res.status(200).json({
              data: updatedPembayaranHutang
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
      models.PembayaranHutang.findOne({
        where: {
          id: id
        }
      }).then((pembayaranHutang) => {
        pembayaranHutang.destroy({ transaction: t}).then(() => {
          res.status(200).json({
            message: 'Success Delete PembayaranHutang',
            data: pembayaranHutang
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
