"use strict";

const bcrypt = require("bcrypt");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Users",
      [
        {
          userName: "admin",
          name: "Administrator",
          surname: "System",
          email: "admin@mail.com",
          password: bcrypt.hashSync('admin123', 10),
          role: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userName: "dferrey",
          name: "Diego",
          surname: "Ferrey",
          email: "dferrey@mail.com",
          phoneNumber: "3512266891",
          address: "El Pais 902 - Villa San Nicolas",
          password: bcrypt.hashSync('ferrey123', 10),
          role: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.sequelize.query(
      'ALTER SEQUENCE "Users_id_seq" RESTART WITH 1;'
    );
    return queryInterface.bulkDelete("Users", null, {});
  },
};
