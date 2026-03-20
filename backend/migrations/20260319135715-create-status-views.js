'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('status_views', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },

      status_id: {
        type: Sequelize.INTEGER,
        references: { model: 'status', key: 'id' },
      },

      user_id: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('status_views');
  },
};