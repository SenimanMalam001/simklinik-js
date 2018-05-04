'use strict';
module.exports = (sequelize, DataTypes) => {
  var Poli = sequelize.define('Poli', {
    name: DataTypes.STRING,
    display_name: DataTypes.STRING
  }, {});
  Poli.associate = function(models) {
    // associations can be defined here
  };
  return Poli;
};