'use strict';
module.exports = (sequelize, DataTypes) => {
  var Profil = sequelize.define('Profil', {
    nama: DataTypes.STRING,
    alamat: DataTypes.STRING,
    no_telp: DataTypes.STRING,
    kode: DataTypes.STRING,
    logo: DataTypes.STRING,
  }, {});
  Profil.associate = function(models) {
    // associations can be defined here
  };
  return Profil;
};
