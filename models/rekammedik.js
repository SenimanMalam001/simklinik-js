'use strict';
const Op = require('sequelize').Op

module.exports = (sequelize, DataTypes) => {
  var RekamMedik = sequelize.define('RekamMedik', {
    no_reg: DataTypes.STRING,
    no_rekam_medik: DataTypes.STRING,
    sistole_diastole: DataTypes.STRING,
    frekuensi_pernapasan: DataTypes.STRING,
    suhu: DataTypes.STRING,
    nadi: DataTypes.STRING,
    berat_badan: DataTypes.STRING,
    tinggi_badan: DataTypes.STRING,
    anamnesa: DataTypes.STRING,
    pemeriksaan_fisik: DataTypes.STRING,
    keadaan_umum: DataTypes.STRING,
    kesadaran: DataTypes.STRING,
    diagnosis_utama: DataTypes.STRING,
    diagnosis_penyerta: DataTypes.STRING,
    diagnosis_penyerta_tambahan: DataTypes.STRING,
    komplikasi: DataTypes.STRING,
    keadaan_pulang: DataTypes.STRING
  }, {});
  RekamMedik.associate = function(models) {
    // associations can be defined here
    RekamMedik.belongsTo(models.Registrasi, { foreignKey: 'no_reg',targetKey: 'no_reg' })
  };
  RekamMedik.beforeCreate(async (item, options) => {

    try {
      const profil = await sequelize.models.Profil.findOne({
        where: {
          id: 1
        }
      })
      const rekamMedik = await sequelize.models.RekamMedik.findOne({
        where: {
          no_rekam_medik: {
            [Op.like]: `${profil.kode}%`
          }
        },
        order: [['createdAt','DESC']]
      })
      if (rekamMedik) {
        let { no_rekam_medik } = rekamMedik
        no_rekam_medik = no_rekam_medik.split('-')
        no_rekam_medik = Number(no_rekam_medik[2]) + 1
        no_rekam_medik = `${profil.kode}-RM-${no_rekam_medik}`
        item.no_rekam_medik = no_rekam_medik
      } else {
        item.no_rekam_medik = `${profil.kode}-RM-1`
      }
    } catch (e) {
      console.log(e);
    }

  })
  return RekamMedik;
};
