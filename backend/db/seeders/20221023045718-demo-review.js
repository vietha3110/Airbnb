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
    await queryInterface.bulkInsert('Reviews', [
      {
        spotId: 1, 
        userId: 2,
        review: "This was an awesome spot!",
        stars: 5
      }, 
      {
        spotId: 1, 
        userId: 3,
        review: "Nice place",
        stars: 5
      },
      {
        spotId: 2, 
        userId: 3,
        review: "Perfect",
        stars: 5
      },
      {
        spotId: 3,
        userId: 4,
        review: "Love this spot - just the perfect place to relax and get away in a beautiful setting.", 
        stars: 5
      }, 
      {
        spotId: 1,
        userId: 4,
        review: "The place is incredible! The views and personal touches make it a 10/10. Super clean and tidy… would love to go back for a longer stay.", 
        stars: 5
      }, 
      {
        spotId: 4,
        userId: 5,
        review: "This lovely house is absolutely perfect. Beautiful space with everything you need.",
        stars: 5
      },
      {
        spotId: 1,
        userId: 5,
        review: "Clean house!",
        stars: 4
      },
      {
        spotId: 5,
        userId: 5,
        review: "Amazing stay: clean, stylish, in a great part of town, and the host was so kind and helpful.",
        stars: 5
      }, 
      {
        spotId: 6,
        userId: 2,
        review: "A true hidden gem",
        stars: 5
      },
      {
        spotId: 7,
        userId: 6,
        review: "Great place, very light and spacious.",
        stars: 5
      },
      {
        spotId: 8,
        userId: 6,
        review: "this place is ok, but the price is expensive!",
        stars: 3
      },
      {
        spotId: 10,
        userId: 4,
        review: "Wonderful stay! Would love to go back!",
        stars: 5
      },
      {
        spotId: 11,
        userId: 4,
        review: "Great location but overpriced",
        stars: 4
      },
      {
        spotId: 11,
        userId: 5,
        review: "The place is incredible!",
        stars: 5
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
    await queryInterface.bulkDelete('Reviews', null, {});
  }
};
