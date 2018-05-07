'use strict';
module.exports = (sequelize, DataTypes) => {
  var RuanganTerpakai = sequelize.define('RuanganTerpakai', {
    ruangan: DataTypes.INTEGER,
    registrasi: DataTypes.INTEGER,
    status_ruangan: DataTypes.INTEGER
  }, {});
  RuanganTerpakai.associate = function(models) {
    // associations can be defined here
  };
  return RuanganTerpakai;
};