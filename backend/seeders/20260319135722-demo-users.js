'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface) {
    const password = await bcrypt.hash('123456', 10);

    await queryInterface.bulkInsert('users', [
      {
        name: 'John Doe',
        mobile: '9999999991',
        password,
        verified: true,
        created_at: new Date(),
      },
      {
        name: 'Jane Smith',
        mobile: '9999999992',
        password,
        verified: true,
        created_at: new Date(),
      },
      {
        name: 'Alex Johnson',
        mobile: '9999999993',
        password,
        verified: true,
        created_at: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('users', null, {});
  },
};