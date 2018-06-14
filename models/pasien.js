'use strict';
module.exports = (sequelize, DataTypes) => {
  var Pasien = sequelize.define('Pasien', {
    no_rm:  {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nama: DataTypes.STRING,
    gender: DataTypes.STRING,
    tanggal_lahir: DataTypes.STRING,
    alamat: DataTypes.STRING,
    no_telp: DataTypes.STRING,
    alergi: DataTypes.STRING,
    penjamin: DataTypes.INTEGER
  }, {});
  Pasien.associate = function(models) {
    // associations can be defined here
  };
  return Pasien;
};
