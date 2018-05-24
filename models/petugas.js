'use strict';
module.exports = (sequelize, DataTypes) => {
  var Petugas = sequelize.define('Petugas', {
    user: DataTypes.INTEGER
  }, {});
  Petugas.associate = function(models) {
    // associations can be defined here
    Petugas.belongsTo(models.User, {foreignKey: 'user'});
  };
  return Petugas;
};
