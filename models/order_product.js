"use strict";

module.exports = (sequelize, DataTypes) => {
  const Order_Product = sequelize.define(
    "Order_Product",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      id_order: {
        type: DataTypes.INTEGER,
        allowNull: false,
        foreignKey: true,
      },
      id_product: {
        type: DataTypes.INTEGER,
        allowNull: false,
        foreignKey: true,
      },
      nameProduct: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      amountProduct: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      priceProduct: {
        type: DataTypes.INTEGER,
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
  Order_Product.associate = function (models) {
    Order_Product.hasMany(models.Product, {
      foreignKey: "id_order",
      as: "Order",
    });
    Order_Product.hasMany(models.User, {
      foreignKey: "id_product",
      as: "Product",
    });
  };
  return Order_Product;
};
