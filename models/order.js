"use strict";

module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      id_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
        foreignKey: true,
      },
      id_status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        foreignKey: true,
      },
      details: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      totalAmount: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      pay: {
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
          exclude: ["updatedAt"],
          include: [[sequelize.fn('date_format', sequelize.col('Order.createdAt'), '%H:%i:%s'), 'Hour']],
        },
      },
    }
  );
  return Order;
};
