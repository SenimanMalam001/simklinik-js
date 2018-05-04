'use strict';
module.exports = (sequelize, DataTypes) => {
  var Kas = sequelize.define('Kas', {
    kode: DataTypes.STRING,
    nama: DataTypes.STRING
  }, {});
  Kas.associate = function(models) {
    // associations can be defined here
  };
  return Kas;
};