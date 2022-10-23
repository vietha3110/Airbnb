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
    await queryInterface.bulkInsert('Spots', [
      {
        ownerId: 1,
        address: "123 Disney Lane",
        city: "San Francisco",
        state: "California",
        country: "United States of America",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "App Academy",
        description: "Place where web developers are created",
        price: 123
      },
      {
        ownerId: 2,
        address: "200 King Street",
        city: "Kirland",
        state: "Washington",
        country: "United States of America",
        lat: 40.7645358,
        lng: 125.4730327,
        name: "Guest House",
        description: "Place for relaxing",
        price: 120
      },
      {
        ownerId: 3,
        address: "80 120th Stree",
        city: "Palo Alto",
        state: "California",
        country: "United States of America",
        lat: 39.7645358,
        lng: 100.4730327,
        name: "App Hotel",
        description: "Beautiful Hotel",
        price: 250
      }
    ])
  },


  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Spots', null, {});
  }
};
