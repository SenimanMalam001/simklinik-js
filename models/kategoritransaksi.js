'use strict';
module.exports = (sequelize, DataTypes) => {
  var KategoriTransaksi = sequelize.define('KategoriTransaksi', {
    name: DataTypes.STRING,
    display_name: DataTypes.STRING
  }, {});
  KategoriTransaksi.associate = function(models) {
    // associations can be defined here
  };
  return KategoriTransaksi;
};
