"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Pay_Types",
      [
        {
          type: "cash",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: "debit-card",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: "credit-card",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.sequelize.query(
      'ALTER SEQUENCE "Pay_Types_id_seq" RESTART WITH 1;'
    );
    return queryInterface.bulkDelete("Pay_Types", null, {});
  },
};
