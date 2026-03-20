'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('blocked_users', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },

      user_id: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
      },

      blocked_user_id: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('blocked_users');
  },
};