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
    await queryInterface.bulkInsert('SpotImages', [
      {
        spotId: 1,
        url: "https://images.pexels.com/photos/449461/pexels-photo-449461.jpeg",
        preview: true
      },
      {
        spotId: 2,
        url: "https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg",
        preview: true
      }, 
      {
        spotId: 3,
        url: "https://images.pexels.com/photos/439391/pexels-photo-439391.jpeg",
        preview: true
      }, 
      {
        spotId: 4,
        url: "https://images.pexels.com/photos/7546321/pexels-photo-7546321.jpeg",
        preview: true
      },
      {
        spotId: 5,
        url: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg",
        preview: true
      },
      {
        spotId: 6,
        url: "https://images.pexels.com/photos/2980955/pexels-photo-2980955.jpeg",
        preview: true
      },
      {
        spotId: 7,
        url: "https://images.pexels.com/photos/13201480/pexels-photo-13201480.jpeg",
        preview: true
      },
      {
        spotId: 8,
        url: "https://images.pexels.com/photos/13201434/pexels-photo-13201434.jpeg",
        preview: true
      },
      {
        spotId: 9,
        url: "https://images.pexels.com/photos/6775272/pexels-photo-6775272.jpeg",
        preview: true
      },
      {
        spotId: 10,
        url: "https://images.pexels.com/photos/4180974/pexels-photo-4180974.jpeg",
        preview: true
      },
      {
        spotId: 11,
        url: "https://images.pexels.com/photos/1693946/pexels-photo-1693946.jpeg",
        preview: true
      },
      {
        spotId: 12,
        url: "https://images.pexels.com/photos/3209037/pexels-photo-3209037.jpeg",
        preview: true
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
     await queryInterface.bulkDelete('SpotImages', null, {});
  }
};
