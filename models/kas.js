'use strict';
const Op = require('sequelize').Op
module.exports = (sequelize, DataTypes) => {
  var Kas = sequelize.define('Kas', {
    kode: DataTypes.STRING,
    nama: DataTypes.STRING,
    default_kas: DataTypes.INTEGER
  }, {});
  Kas.associate = function(models) {
    // associations can be defined here
  };
  Kas.afterCreate((item, options) => {
    if (item.default_kas) {
      Kas.update({
        default_kas: 0
      }, {
        where: {
          id: {
            [Op.ne]: item.id,
          }
        }
      }).catch((err) => {
        console.log(err);
      })
    }
  })

  Kas.afterUpdate((item, options) => {
    if (item.default_kas) {
      Kas.update({
        default_kas: 0
      }, {
        where: {
          id: {
            [Op.ne]: item.id,
          }
        }
      }).catch((err) => {
        console.log(err);
      })
    }
  })
  return Kas;
};
