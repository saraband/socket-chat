'use strict';
module.exports = (sequelize, DataTypes) => {
  const message = sequelize.define('message', {
    content: DataTypes.TEXT
  }, {});
  message.associate = function(models) {
    message.belongsTo(models.room);
    message.hasOne(models.user);
  };
  return message;
};