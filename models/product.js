'use strict';

module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define(
        'Product', {
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
                type: DataTypes.BLOB,
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
        }, {
            defaultScope: {
                attributes: {
                    exclude: ['createdAt', 'updatedAt'],
                },
            },
        }
    );
    Product.associate = function (models) {
        // associations can be defined here
    };
    return Product;
};