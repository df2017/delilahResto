"use strict";

const dotenv = require('dotenv');
dotenv.config();

module.exports = (sequelize, DataTypes) => {
  
  const Product = sequelize.define(
    "Product",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      price: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
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
          include: [[sequelize.fn("concat", `http://${process.env.HOST}:${process.env.PORT}/public/`,sequelize.col("Product.image")), "urlImage"]],
        },
      },
    }
  );
  Product.associate = function (models) {
    // associations can be defined here
  };
  return Product;
};
