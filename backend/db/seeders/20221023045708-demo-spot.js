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
        address: "3814 Chardonnay Drive",
        city: "Seattle",
        state: "Washington",
        country: "United States of America",
        lat: 47.431519,
        lng: -121.898628,
        name: "Beauty House near the lake",
        description: "Place where people can relax",
        price: 123
      },
      {
        ownerId: 2,
        address: "2906 Stockert Hollow Road",
        city: "Kirland",
        state: "Washington",
        country: "United States of America",
        lat: 47.687054,
        lng: -122.180626,
        name: "Entire House in Kirkland",
        description: "This amazing home and the surrounding lovely community are both featured in the New York Times.",
        price: 120
      },
      {
        ownerId: 3,
        address: "1023 Main Street",
        city: "Bellevue",
        state: "Washington",
        country: "United States of America",
        lat: 47.613934,
        lng: -122.155693,
        name: "Cozy Guest Suite",
        description: "Relax with the whole family at this peaceful place with lots of room for fun. Newly remodeled house with new appliances.",
        price: 250
      },
      {
        ownerId: 1,
        address: "1009 Pinnickinick Street",
        city: "Bellevue",
        state: "Washington",
        country: "United States of America",
        lat: 47.613934,
        lng: -122.155693,
        name: "Cozy Guest Suite",
        description: "Relax with the whole family at this peaceful place with lots of room for fun. Newly remodeled house with new appliances.",
        price: 250
      },
      {
        ownerId: 2,
        address: "1023 Main Street",
        city: "Redmond",
        state: "Washington",
        country: "United States of America",
        lat: 47.734489,
        lng: -122.054482,
        name: "Private Urban Suite",
        description: "Private modern loft suite on ground floor level of a brand new construction townhome in the highly desirable Redmond neighborhood.  Modern and sophisticated with tons of light from the vaulted ceilings and floor to ceiling windows.  Minutes to downtown, restaurants & shopping.",
        price: 159
      },
      {
        ownerId: 3,
        address: "3491 King Street",
        city: "Kirkland",
        state: "Washington",
        country: "United States of America",
        lat: 47.642029,
        lng: -122.261307,
        name: "Modern One Bedroom Oasis Just Steps from Downtown",
        description: "Best Location!!!!Enjoy your stay with us, fully equipped with all your basic needs",
        price: 250
      },
      {
        ownerId: 1,
        address: "152 Mudlick Road",
        city: "Yakima",
        state: "Washington",
        country: "United States of America",
        lat: 46.515736,
        lng: -120.568970,
        name: "Cozy House",
        description: "Enjoy the quiet serenity of a gorgeous and peaceful house",
        price: 250
      },
      {
        ownerId: 2,
        address: "3672 Ryder Avenue",
        city: "Everett",
        state: "Washington",
        country: "United States of America",
        lat: 47.918896,
        lng: -122.075882,
        name: "Garden house",
        description: "relax in this calm, private, stylish tiny",
        price: 180
      },
      {
        ownerId: 3,
        address: "14080 Hillcrest Drive",
        city: "Kirkland",
        state: "Washington",
        country: "United States of America",
        lat: 47.538788,
        lng:-122.185471,
        name: "Lovely apartment in Tukwila",
        description: "Lovely place with cheapest price in Tukwila",
        price: 87
      },
      {
        ownerId: 3,
        address: "2959 Canis Heights Drive",
        city: "Los Angeles",
        state: "Oregon",
        country: "United States of America",
        lat: 34.112270,
        lng: -118.330162,
        name: "Beautiful house",
        description: "Best Location in LA",
        price: 230
      }, 
      {
        ownerId: 1,
        address: "3399 Harrison Street",
        city: "Oakland",
        state: "California",
        country: "United States of America",
        lat: 37.880817,
        lng: -122.244873,
        name: "House for family",
        description: "Relax with the whole family at this peaceful place to stay.",
        price: 189
      }, 
      {
        ownerId: 2,
        address: "1541 Marietta Street",
        city: "Santa Rosa",
        state: "California",
        country: "United States of America",
        lat: 38.374184,
        lng:-122.811462,
        name: "Charming 2 Bedroom house",
        description: "Enjoy a cozy place! 5 minutes from downtown, free PARKING",
        price: 129
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
    await queryInterface.bulkDelete('Spots', null, {});
  }
};
