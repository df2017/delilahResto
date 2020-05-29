'use strict';

module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define(
        'Order', {
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
            descriptions: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            id_product: {
                type: DataTypes.INTEGER,
                allowNull: false,
                foreignKey: true,
            },
            id_user: {
                type: DataTypes.INTEGER,
                allowNull: false,
                foreignKey: true,
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
        }, {
            defaultScope: {
                attributes: {
                    exclude: ['createdAt', 'updatedAt'],
                },
            },
        }
    );
    Order.associate = function (models) {
        Order.hasMany(models.Product, {
            foreignKey: 'id_product',
            as: 'Product',
        });
        Order.hasMany(models.User, {
            foreignKey: 'id_user',
            as: 'User',
        });
    };
    return Order;
};