'use strict';

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
    await queryInterface.bulkInsert('Bookings', [
      {
        spotId: 1,
        userId: 3,
        startDate: "2022-11-1",
        endDate: "2022-11-5"
      },
      {
        spotId: 2,
        userId: 3,
        startDate: "2022-12-1",
        endDate: "2022-12-5"
      },
      {
        spotId: 3,
        userId: 1,
        startDate: "2022-10-30",
        endDate: "2022-11-8"
      },
      {
        spotId: 1,
        userId: 5,
        startDate: "2022-12-1",
        endDate: "2022-12-5"
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Bookings', null, {});
  }
};
