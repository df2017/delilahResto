"use strict";

const bcrypt = require("bcrypt");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Products",
      [
        {
          name: "Hamburger American",
          description: "beef, cheese, lettuce, tomato, onion, pickles, bacon",
          price: 370,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Hamburger Mexican",
          description: "beef, cheese, lettuce, tomato, onion, aji",
          price: 350,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Hamburger Cheese",
          description: "beef, cheese, lettuce, tomato, doble cheese",
          price: 320,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Hamburger Vegetarian",
          description: "soybeans and tofu, nuts, grains, seeds, fungi",
          price: 300,
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
