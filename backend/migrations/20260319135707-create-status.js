'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('status', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },

      user_id: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
      },

      file_url: Sequelize.STRING,
      type: Sequelize.STRING,

      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('status');
  },
};