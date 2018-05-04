'use strict';
module.exports = (sequelize, DataTypes) => {
  var Satuan = sequelize.define('Satuan', {
    name: DataTypes.STRING,
    display_name: DataTypes.STRING
  }, {});
  Satuan.associate = function(models) {
    // associations can be defined here
  };
  return Satuan;
};