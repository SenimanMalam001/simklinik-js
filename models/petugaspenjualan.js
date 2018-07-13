'use strict';
module.exports = (sequelize, DataTypes) => {
  var PetugasPenjualan = sequelize.define('PetugasPenjualan', {
    user: DataTypes.INTEGER,
    penjualan: DataTypes.STRING
  }, {});
  PetugasPenjualan.associate = function(models) {
    // associations can be defined here
    PetugasPenjualan.belongsTo(models.User, { foreignKey: 'user'} )
  };
  return PetugasPenjualan;
};
