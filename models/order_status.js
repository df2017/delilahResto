"use strict";

module.exports = (sequelize, DataTypes) => {
  const Order_Statuses = sequelize.define(
    "Order_Statuses",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      defaultScope: {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
    }
  );
  return Order_Statuses;
};
