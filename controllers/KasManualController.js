const models = require('../models');
const Op = require('sequelize').Op
const moment = require('moment')

module.exports = {
  find: (req,res) => {
    const { id } = req.params
    models.KasManual.findOne({
      where: {
        id: id
      }
    }).then(kasManual => {
      res.status(200).json({
        message: 'Success Read Kas Manual',
        data: kasManual
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
    models.KasManual.count({
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
      return models.KasManual.all({
        where: {
          no_trans: { [Op.like]: `%${q}%`}
        },
        limit,
        offset,
        include: [
          {
            model: models.Kas,
          },
          {
            model: models.KategoriTransaksi,
          }
        ]
      })
    }).then(data => {
      const { pages } = pagination
      let kasManual = []
      data.forEach(data => {
        kasManual.push({
          id: data.id,
          no_trans: data.no_trans,
          jenis: data.jenis,
          kas: data.Ka.nama,
          kategori: data.KategoriTransaksi.name,
          jumlah: data.jumlah,
          waktu: moment(data.createdAt).format('DD-MM-YYYY, h:mm:ss'),
          keterangan: data.keterangan,
        })
      })
      res.status(200).json({
        message: 'Success Read KasManual',
        data: {
          data: kasManual,
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
    const { kas, keterangan, jumlah, kategori, jenis } = req.body
    models.KasManual.create({
        kas,
        keterangan,
        jumlah,
        kategori,
        jenis
    }).then((kasManual) => {
      res.status(201).json({
        message: 'Success Create Kas Manual',
        data: kasManual
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
    const { kas, keterangan, jumlah, kategori, jenis } = req.body
    models.KasManual.findOne({
      where: { id: id}
    }).then((penjamin) => {
      if (penjamin) {
        penjamin.update({
          kas,
          keterangan,
          jumlah,
          kategori,
          jenis
        }).then((updatedRuangan) => {
          res.status(200).json({
            message: "Success Update Kas Manual",
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
    models.KasManual.findOne({
      where: {
        id: id
      }
    }).then((penjamin) => {
      penjamin.destroy().then(() => {
        res.status(200).json({
          message: 'Success Delete Kas Manual',
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
