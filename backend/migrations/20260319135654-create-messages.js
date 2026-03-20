'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('messages', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },

      sender_id: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
      },

      receiver_id: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
      },

      message: Sequelize.TEXT,
      file_url: Sequelize.STRING,

      type: {
        type: Sequelize.ENUM(
          'text',
          'image',
          'video',
          'audio',
          'file',
          'status_reply'
        ),
        defaultValue: 'text',
      },

      deleted_for_me: { type: Sequelize.BOOLEAN, defaultValue: false },
      deleted_for_all: { type: Sequelize.BOOLEAN, defaultValue: false },

      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('messages');
  },
};