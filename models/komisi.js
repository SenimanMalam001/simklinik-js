'use strict';
module.exports = (sequelize, DataTypes) => {
  var Komisi = sequelize.define('Komisi', {
    produk: DataTypes.INTEGER,
    user: DataTypes.INTEGER,
    jumlah: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {});
  Komisi.associate = function(models) {
    // associations can be defined here
    Komisi.belongsTo(models.User, { foreignKey: 'user' })
    Komisi.belongsTo(models.Produk, { foreignKey: 'produk'})
  };

  return Komisi;
};
