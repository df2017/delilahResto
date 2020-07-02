"use strict";

const bcrypt = require("bcrypt");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Products",
      [
        {
          name: "Hamburger Classic",
          description: "beef, lettuce, tomato, onion, ketchup",
          price: 300,
          image: "image-1b8fb5c5-90ff-4117-9f78-1087c5b4233b.jpeg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Hamburger Cheddar and Bacon",
          description: "beef, lettuce, tomato, cheddar cheese, bacon, ketchup",
          price: 350,
          image: "image-afb31962-84b4-4274-b498-8be4f84265e8.jpeg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Hamburger Special rocket",
          description: "beef, cheese, rocket, fried onion ring, ketchup",
          price: 320,
          image: "image-c2f68174-c1e4-4482-996a-2bcc6e939c04.jpeg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Hamburger Vegetarian",
          description: "soybeans and tofu, lettuce, tomato, cucumber, cabbage",
          price: 290,
          image: "image-9b8a6186-5877-4b90-97c1-14ec842efb79.jpeg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.sequelize.query(
      'ALTER SEQUENCE "Products_id_seq" RESTART WITH 1;'
    );
    return queryInterface.bulkDelete("Products", null, {});
  },
};
