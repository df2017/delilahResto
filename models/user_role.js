"use strict";

module.exports = (sequelize, DataTypes) => {
  const User_Role = sequelize.define(
    "User_Role",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      role: {
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
  return User_Role;
};