'use strict';
module.exports = (sequelize, DataTypes) => {
  var Registrasi = sequelize.define('Registrasi', {
    no_reg: DataTypes.STRING,
    pasien: DataTypes.INTEGER,
    penjamin: DataTypes.INTEGER,
    poli: DataTypes.INTEGER,
    dokter: DataTypes.INTEGER,
    ruangan: DataTypes.INTEGER,
    status_registrasi: DataTypes.INTEGER,
    jenis_registrasi: DataTypes.STRING
  }, {});
  Registrasi.associate = function(models) {
    // associations can be defined here
  };
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
    const { id } = registrasi
    sequelize.models.RuanganTerpakai.findOne({
      where:id
    }).then((ruanganTerpakai) => {
      if (ruanganTerpakai) {
        ruanganTerpakai.destroy()
      }
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
