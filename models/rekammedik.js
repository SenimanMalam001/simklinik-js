'use strict';
module.exports = (sequelize, DataTypes) => {
  var RekamMedik = sequelize.define('RekamMedik', {
    no_reg: DataTypes.STRING,
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
  };
  return RekamMedik;
};
