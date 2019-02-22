'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
    await queryInterface.removeColumn('messages', 'userId');
    await queryInterface.addColumn('messages', 'username', Sequelize.STRING);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('messages', 'userId', Sequelize.INTEGER);
    await queryInterface.removeColumn('messages', 'username');
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING
      },
      username: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  }
};
