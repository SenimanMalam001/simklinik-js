const models = require('../models');
const Op = require('sequelize').Op
const transaction = require('sequelize').transaction
const sequelize = require('sequelize')

module.exports = {

  find: (req,res) => {
    const { id } = req.params
    models.Piutang.findOne({
      where: {
        id: id
      }
    }).then(Piutang => {
      res.status(200).json({
        message: 'Success Read Piutang',
        data: Piutang
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
    models.Piutang.count({
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
      return models.Piutang.all({
        where: {
          no_trans: { [Op.like]: `%${q}%`}
        },
        limit,
        offset,
      })
    }).then(data => {
      const { pages } = pagination
      let Piutang = []
      data.forEach(data => {
        Piutang.push({
          id: data.id,
          no_trans: data.no_trans,
          jumlah_bayar: data.jumlah_bayar,
          cara_bayar: data.cara_bayar,
        })
      })
      res.status(200).json({
        message: 'Success Read Piutang',
        data: {
          data: Piutang,
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
      jumlah_bayar,
      cara_bayar
    } = req.body
    const { user } = req
    models.sequelize.transaction().then(t => {
      return models.Piutang.create({
        jumlah_bayar,
        cara_bayar,
        userCreated: user.id,
        userEdited: user.id
      }, { transaction: t}).then((result) => {
        res.status(201).json({
          message: 'Success Create Piutang',
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
      models.Piutang.findOne({
        where: { id: id}
      }).then((Piutang) => {
        if (Piutang) {
          models.sequelize.transaction(t => {
          Piutang.update({...input, userEdited: req.user.id}).then((updatedPiutang) => {
            res.status(200).json({
              data: updatedPiutang
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
      models.Piutang.findOne({
        where: {
          id: id
        }
      }).then((Piutang) => {
        Piutang.destroy({ transaction: t}).then(() => {
          res.status(200).json({
            message: 'Success Delete Piutang',
            data: Piutang
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
