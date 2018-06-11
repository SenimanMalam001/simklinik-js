'use strict';
const moment = require('moment')

module.exports = (sequelize, DataTypes) => {
  var Registrasi = sequelize.define('Registrasi', {
    no_reg: DataTypes.STRING,
    pasien: DataTypes.INTEGER,
    penjamin: DataTypes.INTEGER,
    poli: DataTypes.INTEGER,
    dokter: DataTypes.INTEGER,
    ruangan: DataTypes.INTEGER,
    status_registrasi: DataTypes.INTEGER,
    jenis_registrasi: DataTypes.STRING,
    no_antrian: DataTypes.INTEGER
  }, {});
  Registrasi.associate = function(models) {
    // associations can be defined here
    Registrasi.belongsTo(models.User, { foreignKey: 'dokter' })
    Registrasi.belongsTo(models.Poli, { foreignKey: 'poli' })
    Registrasi.belongsTo(models.Ruangan, { foreignKey: 'ruangan' })
    Registrasi.belongsTo(models.Pasien, { foreignKey: 'pasien', targetKey: 'no_rm' })
    Registrasi.belongsTo(models.Penjamin, { foreignKey: 'penjamin' })
  };
  Registrasi.beforeCreate(async (registrasi, options) => {
    try {
      const reg_terakhir = await Registrasi.findOne({
        order: [['createdAt','DESC']]
      })
      if (reg_terakhir) {
        const tanggal_akhir = moment(reg_terakhir.createdAt).format('YYYY-MM-DD')
        const tanggal_sekarang = moment().format('YYYY-MM-DD')
        if (tanggal_akhir == tanggal_sekarang) {
          const antrian = Number(reg_terakhir.no_antrian) + 1
          registrasi.no_antrian = antrian
        } else {
          console.log('masuk 1111111');
          registrasi.no_antrian = 1
        }
      } else {
        registrasi.no_antrian = 1
      }
      return registrasi
    } catch (e) {
      console.log(e);
    }
  })
  Registrasi.afterCreate((registrasi) => {
    const { ruangan, id } = registrasi
    if (Number(ruangan) > 0) {
      sequelize.models.RuanganTerpakai.create({
        ruangan: ruangan,
        registrasi: id
      }).then((terpakai) => {
      }).catch(err => console.log(err))
    }
  });

  Registrasi.afterDestroy((registrasi) => {
    const { id, no_reg } = registrasi
    sequelize.models.RuanganTerpakai.findOne({
      where:id
    }).then((ruanganTerpakai) => {
      if (ruanganTerpakai) {
        ruanganTerpakai.destroy()
      }
      return sequelize.models.RekamMedik.destroy({
        where: {
          no_reg
        }
      })
    }).catch(err => console.log(err))
  })

  Registrasi.afterUpdate((registrasi) => {
    const { ruangan, id, status_registrasi } = registrasi
    const SELESAI = 1
    //jika registrasi selesai maka status ruangan di ganti 0
    if (status_registrasi == SELESAI) {
      sequelize.models.RuanganTerpakai.findOne({
        where: {
          registrasi: id
        }
      }).then((ruanganTerpakai) => {
        return ruanganTerpakai.update({
          status_ruangan: 0
        })
      }).catch(err => console.log(err))
    } else {
      sequelize.models.RuanganTerpakai.findOne({
        where: { registrasi: id}
      }).then((ruanganTerpakai) => {
        if (ruanganTerpakai) {
          ruanganTerpakai.destroy()
        }
        if (Number(ruangan) > 0) {
          sequelize.models.RuanganTerpakai.create({
            ruangan: ruangan,
            registrasi: id
          }).then((terpakai) => {
          }).catch(err => console.log(err))
        }
      }).catch(err => console.log(err))
    }
  });
  return Registrasi;
};
