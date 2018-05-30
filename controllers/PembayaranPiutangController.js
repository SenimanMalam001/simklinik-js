const models = require('../models');
const Op = require('sequelize').Op
const transaction = require('sequelize').transaction
const sequelize = require('sequelize')
const moment = require('moment')

module.exports = {

  find: (req,res) => {
    const { id } = req.params
    models.PembayaranPiutang.findOne({
      where: {
        id: id
      }
    }).then(pembayaranPiutang => {
      res.status(200).json({
        message: 'Success Read PembayaranPiutang',
        data: pembayaranPiutang
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
    models.PembayaranPiutang.count({
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
      return models.PembayaranPiutang.all({
        where: {
          no_trans: { [Op.like]: `%${q}%`}
        },
        limit,
        offset,
        include: [
          {
            model: models.Penjamin
          },
        ]
      })
    }).then(data => {
      const { pages } = pagination
      let pembayaranPiutang = []
      data.forEach(data => {
        pembayaranPiutang.push({
          id: data.id,
          no_trans: data.no_trans,
          jumlah_bayar: data.jumlah_bayar,
          penjamin: data.Penjamin.nama,
          interval: `${moment(data.dari_tanggal).format('YYYY-MM-DD')} / ${moment(data.sampai_tanggal).format('YYYY-MM-DD')}`,
        })
      })
      res.status(200).json({
        message: 'Success Read PembayaranPiutang',
        data: {
          data: pembayaranPiutang,
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
      penjamin,
      dari_tanggal,
      sampai_tanggal
    } = req.body
    const { user } = req
    models.sequelize.transaction().then(t => {
      return models.PembayaranPiutang.create({
        cara_bayar,
        penjamin,
        dari_tanggal,
        sampai_tanggal,
        userCreated: user.id,
        userEdited: user.id
      }, { transaction: t}).then((result) => {
        res.status(201).json({
          message: 'Success Create PembayaranPiutang',
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
      models.PembayaranPiutang.findOne({
        where: { id: id}
      }).then((pembayaranPiutang) => {
        if (pembayaranPiutang) {
          models.sequelize.transaction(t => {
          pembayaranPiutang.update({...input, userEdited: req.user.id}).then((updatedPembayaranPiutang) => {
            res.status(200).json({
              data: updatedPembayaranPiutang
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
      models.PembayaranPiutang.findOne({
        where: {
          id: id
        }
      }).then((pembayaranPiutang) => {
        pembayaranPiutang.destroy({ transaction: t}).then(() => {
          res.status(200).json({
            message: 'Success Delete PembayaranPiutang',
            data: pembayaranPiutang
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
