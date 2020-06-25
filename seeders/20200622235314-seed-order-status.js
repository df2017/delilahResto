"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Order_Statuses",
      [
        {
          status: "new",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          status: "confirmed",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          status: "prepared",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          status: "sending",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          status: "canceled",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          status: "delivered",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.sequelize.query(
      'ALTER SEQUENCE "Order_Statuses_id_seq" RESTART WITH 1;'
    );
    return queryInterface.bulkDelete("Order_Statuses", null, {});
  },
};