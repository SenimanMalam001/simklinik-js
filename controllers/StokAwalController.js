const models = require('../models');
const Op = require('sequelize').Op
var {uploadExcell} = require('../middlewares/upload')
const xlsx = require('node-xlsx').default;

module.exports = {
  find: (req,res) => {
    const { id } = req.params
    models.StokAwal.findOne({
      where: {
        id: id
      }
    }).then(user => {
      res.status(200).json({
        message: 'Success Read StokAwal',
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
    models.StokAwal.count({
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
      return models.StokAwal.all({
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
      let stokAwal = []
      data.forEach(data => {
        stokAwal.push({
          id: data.id,
          no_trans: data.no_trans,
          produk: data.Produk.nama,
          jumlah: data.jumlah,
        })
      })
      res.status(200).json({
        message: 'Success Read StokAwal',
        data: {
          data: stokAwal,
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
  createStokAwal: (req, res) => {
    const { produk,  jumlah } = req.body
    models.StokAwal.create({
        produk,
        jumlah,
    }).then((stokAwal) => {
      res.status(201).json({
        message: 'Success Create StokAwal',
        data: stokAwal
      })
    }).catch((err) => {
      console.log(err);
      res.status(500).json({
        message: 'Something Went Wrong',
      })
    })
  },
  create:  async (req, res, next) => {
    uploadExcell(req, res, (err) => {
      if (err) {
        return res.status(500).json({ message: err})
      }
      if (!req.file) {
        next()
      } else {
        const workSheetsFromFile = xlsx.parse(req.file.path);
        const kode_produk = []
        const importData = []
        workSheetsFromFile[0].data.forEach(data => {
          kode_produk.push(data[0])
          importData.push({
            jumlah: data[1],
            produk: '',
            no_trans:'',
            createdAt: new Date(),
            updatedAt: new Date(),
          })
        })
        models.Produk.findAll({
          where: {
            kode: {
              [Op.in]: kode_produk
            }
          }
        }).then(produk => {
          produk.forEach((data, index) => {
            importData[index].produk = data.id
          })
          return importData
        }).then(async (importData) => {
          const stokAwal = await models.StokAwal.findOne({ order: [['id', 'DESC']]})
          let nomor
          if (stokAwal) {
            console.log(stokAwal.no_trans,'============================');
            let { no_trans } = stokAwal
            no_trans = no_trans.split('-')
            no_trans = Number(no_trans[1]) + 1
            nomor = no_trans
          } else {
            nomor = 1
          }
          importData.forEach((data, index) => {
            importData[index].no_trans = `SA-${nomor++}`
          })

          console.log(importData,'==============================');

          return models.StokAwal.bulkCreate(importData)
        }).then((data) => {
          res.status(201).json({
            message: 'Success Create StokAwal',
            data: data
          })
        }).catch(err => {
          console.log(err);
          res.status(500).json({
            message: 'Something Went Wrong',
          })
        })
      }
    })

  },
  update: (req, res) => {
    const { id } = req.params
    const { produk,  jumlah } = req.body
    models.StokAwal.findOne({
      where: { id: id}
    }).then((stokAwal) => {
      if (stokAwal) {
        stokAwal.update({
          produk,
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
    models.StokAwal.findOne({
      where: {
        id: id
      }
    }).then((stokAwal) => {
      stokAwal.destroy().then(() => {
        res.status(200).json({
          message: 'Success Delete StokAwal',
          data: stokAwal
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
