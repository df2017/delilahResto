"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "User_Roles",
      [
        {
          role: "admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          role: "client",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.sequelize.query(
      'ALTER SEQUENCE "User_Roles_id_seq" RESTART WITH 1;'
    );
    return queryInterface.bulkDelete("User_Roles", null, {});
  },
};
