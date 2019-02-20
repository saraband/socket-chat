'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('messages', 'userId', Sequelize.INTEGER);
    await queryInterface.addColumn('messages', 'roomId', Sequelize.INTEGER);
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('messages', 'userId');
    await queryInterface.removeColumn('messages', 'roomId');
  }
};