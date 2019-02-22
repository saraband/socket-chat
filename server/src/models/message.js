'use strict';
module.exports = (sequelize, DataTypes) => {
  const message = sequelize.define('message', {
    content: DataTypes.TEXT,
    username: DataTypes.STRING
  }, {});
  message.associate = function(models) {
    message.belongsTo(models.room);
  };
  return message;
};
