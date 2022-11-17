'use strict';
const bcrypt = require('bcryptjs')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: 'Ha',
        lastName: 'Nguyen'
      },
      {
        email: 'use1@user.io',
        username: 'FakeUser1',
        hashedPassword: bcrypt.hashSync('password12'),
        firstName: "Jade",
        lastName: "Tran"
      },
      {
        email: 'user2@user.io',
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password234'),
        firstName: "Dan",
        lastName: "Chin"
      },
      {
        email: 'user3@user.io',
        username: 'javrisle',
        hashedPassword: bcrypt.hashSync('password@234'),
        firstName: "Javris",
        lastName: "Le"
      },
      {
        email: 'user4@user.io',
        username: 'FakeUser4',
        hashedPassword: bcrypt.hashSync('password@22234'),
        firstName: "Drake",
        lastName: "Cool"
      },
      {
        email: 'user5@user.io',
        username: 'FakeUser5',
        hashedPassword: bcrypt.hashSync('password@234'),
        firstName: "Thamiris",
        lastName: "Biden"
      },
      {
        email: 'user6@user.io',
        username: 'FakeUser6',
        hashedPassword: bcrypt.hashSync('password@234@'),
        firstName: "Bailey",
        lastName: "Daniel"
      },

    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
